package com.npupas.api.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.Calendar;
import java.util.Date;

public class DateUtils {
    public static Date standardFormat(String dateStr) {
        try {
            DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            return format.parse(dateStr);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    public static Long getDateInstant(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);

        return calendar.getTimeInMillis();
    }

    public static boolean isBetweenTwoTimes(String openTime, String closeTime) {
        LocalTime now = LocalTime.now();
        LocalTime open = LocalTime.parse(openTime);
        LocalTime close = LocalTime.parse(closeTime);

        if (open.isBefore(close)) {
            return now.isAfter(open) && now.isBefore(close);
        } else if (open.equals(close)) {
            return true;
        } else {
            return now.isAfter(open) || now.isBefore(close);
        }
    }
}
