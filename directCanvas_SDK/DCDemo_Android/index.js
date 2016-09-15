//This is where you'll write all your code that should be passed to the directCanvas layer in advance

//include main.js in DirectCanvas layer
AppMobi.context.include( 'init.js' );
AppMobi.context.include( 'dcAndroid.js' );

//hide the splash screen
if (AppMobi.webview) {
	AppMobi.webview.execute("AppMobi.device.hideSplashScreen();");
}
