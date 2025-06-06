package com.haroldtran.clover.bridge.payments;

import com.facebook.react.bridge.*;
import com.google.gson.Gson;
import org.json.*;

public class Utils {

    private static final Gson gson = new Gson();

    public static WritableMap toWritableMap(Object data) {
        if (data == null) return Arguments.createMap();

        try {
            JSONObject jsonObject = new JSONObject(gson.toJson(data));
            return convertJsonToMap(jsonObject);
        } catch (JSONException e) {
            e.printStackTrace();
            return Arguments.createMap();
        }
    }

    public static WritableArray toWritableArray(Object data) {
        if (data == null) return Arguments.createArray();

        try {
            JSONArray jsonArray = new JSONArray(gson.toJson(data));
            return convertJsonToArray(jsonArray);
        } catch (JSONException e) {
            e.printStackTrace();
            return Arguments.createArray();
        }
    }

    public static WritableMap convertJsonToMap(JSONObject jsonObject) {
        WritableMap map = Arguments.createMap();
        if (jsonObject == null) return map;

        try {
            JSONArray keys = jsonObject.names();
            if (keys == null) return map;

            for (int i = 0; i < keys.length(); i++) {
                String key = keys.optString(i);
                Object value = jsonObject.opt(key);
                putValueToMap(map, key, value);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return map;
    }

    public static WritableArray convertJsonToArray(JSONArray jsonArray) {
        WritableArray array = Arguments.createArray();
        if (jsonArray == null) return array;

        try {
            for (int i = 0; i < jsonArray.length(); i++) {
                Object value = jsonArray.opt(i);
                pushValueToArray(array, value);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return array;
    }

    private static void putValueToMap(WritableMap map, String key, Object value) {
        try {
            if (value instanceof JSONObject) {
                map.putMap(key, convertJsonToMap((JSONObject) value));
            } else if (value instanceof JSONArray) {
                map.putArray(key, convertJsonToArray((JSONArray) value));
            } else if (value instanceof Boolean) {
                map.putBoolean(key, (Boolean) value);
            } else if (value instanceof Integer) {
                map.putInt(key, (Integer) value);
            } else if (value instanceof Long) {
                map.putDouble(key, ((Long) value).doubleValue()); // RN không có putLong
            } else if (value instanceof Float || value instanceof Double) {
                map.putDouble(key, ((Number) value).doubleValue());
            } else if (value == JSONObject.NULL || value == null) {
                map.putNull(key);
            } else {
                map.putString(key, value.toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void pushValueToArray(WritableArray array, Object value) {
        try {
            if (value instanceof JSONObject) {
                array.pushMap(convertJsonToMap((JSONObject) value));
            } else if (value instanceof JSONArray) {
                array.pushArray(convertJsonToArray((JSONArray) value));
            } else if (value instanceof Boolean) {
                array.pushBoolean((Boolean) value);
            } else if (value instanceof Integer) {
                array.pushInt((Integer) value);
            } else if (value instanceof Long) {
                array.pushDouble(((Long) value).doubleValue());
            } else if (value instanceof Float || value instanceof Double) {
                array.pushDouble(((Number) value).doubleValue());
            } else if (value == JSONObject.NULL || value == null) {
                array.pushNull();
            } else {
                array.pushString(value.toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}