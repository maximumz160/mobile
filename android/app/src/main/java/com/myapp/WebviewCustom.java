package com.myapp;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.webkit.WebView;
import android.widget.Toast;

import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.webview.ReactWebViewManager;

import java.math.BigDecimal;

@ReactModule(name = WebviewCustom.REACT_CLASS_CUSTOM)
public class WebviewCustom extends ReactWebViewManager {


    protected  static ThemedReactContext context;
    protected static final  String REACT_CLASS_CUSTOM="WebviewCustom";
    protected static class CustomWebClient extends ReactWebViewClient {};

    protected static class Custom extends ReactWebView implements SensorEventListener {

        protected static SensorManager sensorManager=null;
        protected static Sensor sensor=null;
        protected int LocationCurrent;//vị trí của thanh cuộn
        protected float LocationY;
        protected int LocationChange=0;//vị trí cập nhật

        protected boolean CheckAction=false;

        /**
         * WebView must be created with an context of the current activity
         * <p>
         * Activity Context is required for creation of dialogs internally by WebView
         * Reactive Native needed for access to ReactNative internal system functionality
         *
         * @param reactContext
         */
        public Custom(ThemedReactContext reactContext) {
            super(reactContext);
            context=reactContext;

        }



        public void SetAtutoScroll(boolean TurnOnScrollAuto){
            if(TurnOnScrollAuto){
                sensorManager = (SensorManager) context.getSystemService(Context.SENSOR_SERVICE);
                sensor= sensorManager.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR);
                sensorManager.registerListener(this,sensor,SensorManager.SENSOR_DELAY_NORMAL);
            }else {
                if(sensorManager!=null){
                    sensorManager.unregisterListener(this);
                    this.setScrollY(LocationChange);
                    LocationChange=0;
                    CheckAction=false;
                }
            }
        }

        @Override
        public void onSensorChanged(SensorEvent sensorEvent) {

            float GetData = sensorEvent.values[1];
                this.scrollBy(0, (int) (GetData*10));

//            if(LocationChange == 0 && CheckAction == false){
//                LocationY = GetData ;CheckAction=true;
//            }
//
//            if(GetData >= LocationY){
//                this.scrollBy(0, (int) (GetData*10)+8);
//
//            }else {
//                this.scrollBy(0, (int) -(GetData*10)+5);
//                //Toast.makeText(context,"abc"+LocationY,Toast.LENGTH_SHORT).show();
//            }

            //LocationChange= this.getScrollY();

        }

        @Override
        public void onAccuracyChanged(Sensor sensor, int i) {

        }

    }

    @Override
    protected ReactWebView createReactWebViewInstance(ThemedReactContext reactContext) {
        return new Custom(reactContext);
    }

    @Override
    public String getName() {
        return REACT_CLASS_CUSTOM;
    }

    @Override
    protected void addEventEmitters(ThemedReactContext reactContext, WebView view) {
        view.setWebViewClient(new CustomWebClient());
    }

    @ReactProp(name="AutoScroll",defaultBoolean = false)
    public void setAutoScroll(WebView view, boolean TurnOnScrollAuto)
    {
        ((Custom) view).SetAtutoScroll(TurnOnScrollAuto);
    }


}
