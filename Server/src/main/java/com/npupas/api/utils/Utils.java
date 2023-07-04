package com.npupas.api.utils;

public class Utils {

    public final static int TOKEN_INDEX = 7;

    public static String getToken(String entireToken) {
        return entireToken.substring(TOKEN_INDEX);
    }
}
