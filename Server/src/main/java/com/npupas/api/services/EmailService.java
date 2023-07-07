package com.npupas.api.services;

import com.npupas.api.models.dtos.MailMessageDTO;
import javax.mail.MessagingException;
import java.io.IOException;

public interface EmailService {
    void sendWelcomeEmail(MailMessageDTO mail) throws MessagingException, IOException;

    void sendSalesBranchesEmail(MailMessageDTO mail,
                                String name_pupuseria,
                                SalesBranchesDTO salesChartsDTO) throws MessagingException, IOException;
}
