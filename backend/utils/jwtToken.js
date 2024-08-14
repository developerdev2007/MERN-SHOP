///!!! create and save in cookies

export const sendToken = async (user, statusCode, res) => {
  const token = user.getJwtToken();

  /// //*** options for cookies */
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), //90days
    httpOnly: true,
    Secure: true,
    sameSite: "none",
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
