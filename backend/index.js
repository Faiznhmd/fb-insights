const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

/**
 * STEP 1: Redirect user to Facebook login
 */
app.get('/auth/facebook', (req, res) => {
  const fbAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${process.env.APP_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=pages_show_list,pages_read_engagement`;

  res.redirect(fbAuthUrl);
});

/**
 * STEP 2: Callback route
 */
app.get('/auth/facebook/callback', async (req, res) => {
  try {
    const code = req.query.code;

    const tokenRes = await axios.get(
      'https://graph.facebook.com/v18.0/oauth/access_token',
      {
        params: {
          client_id: process.env.APP_ID,
          client_secret: process.env.APP_SECRET,
          redirect_uri: process.env.REDIRECT_URI,
          code,
        },
      },
    );

    const access_token = tokenRes.data.access_token;

    res.redirect(`http://localhost:3000?access_token=${access_token}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * STEP 3: Get user profile
 */
app.get('/user', async (req, res) => {
  try {
    const { access_token } = req.query;

    const user = await axios.get(
      `https://graph.facebook.com/me?fields=name,picture`,
      { params: { access_token } },
    );

    res.json(user.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * STEP 4: Get pages
 */
app.get('/pages', async (req, res) => {
  try {
    const { access_token } = req.query;

    const pages = await axios.get(`https://graph.facebook.com/me/accounts`, {
      params: { access_token },
    });

    res.json(pages.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * STEP 5: Get insights
 */
app.get('/insights', async (req, res) => {
  try {
    const { page_id, page_token } = req.query;

    const response = await axios.get(
      `https://graph.facebook.com/v18.0/${page_id}`,
      {
        params: {
          access_token: page_token,
          fields: 'name,fan_count,followers_count',
        },
      },
    );

    res.json({
      data: [
        {
          name: 'Followers',
          values: [{ value: response.data.followers_count || 0 }],
        },
        {
          name: 'Fans',
          values: [{ value: response.data.fan_count || 0 }],
        },
      ],
    });
  } catch (err) {
    // console.log('ERROR:', err.response?.data);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
