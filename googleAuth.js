const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const GOOGLE_CLIENT_ID = "590989979514-ktkbrtatk2b6arl05cf79h3m4mfmt6l1.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
passport.use(new GoogleStrategy({
        clientID:     GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true,
    },
    function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }));
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});