package com.example.huunghi.myapplication;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;

public class MainActivity extends AppCompatActivity {

    private ImageButton Move;
    private int numberImage = 0;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Move = (ImageButton) findViewById(R.id.moveButton);
        Move.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                numberImage ++;
                switch (numberImage){
                    case 1: Move.setImageResource(R.drawable.hinh2);break;
                    case 2: Move.setImageResource(R.drawable.hinh3);break;
                    default: numberImage = 0; Move.setImageResource(R.drawable.android);
                }
            }
        });

    }
}
