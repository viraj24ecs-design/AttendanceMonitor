module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Check environment variables
  const envCheck = {
    status: 'ok',
    mongodb_uri_exists: !!process.env.MONGODB_URI,
    mongodb_uri_length: process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0,
    mongodb_uri_starts_with: process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 20) : 'not set',
    jwt_secret_exists: !!process.env.JWT_SECRET,
    jwt_secret_length: process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0,
    node_env: process.env.NODE_ENV || 'not set',
    timestamp: new Date().toISOString()
  };

  res.status(200).json(envCheck);
};
