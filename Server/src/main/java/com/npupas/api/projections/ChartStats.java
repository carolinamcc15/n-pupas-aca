package com.npupas.api.projections;

import java.util.Date;

public interface ChartStats {
    Long getTransactionId();
    Date getDate();
    Double getTotal();
}
