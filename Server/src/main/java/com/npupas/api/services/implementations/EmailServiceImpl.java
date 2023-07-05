package com.npupas.api.services.implementations;

import com.npupas.api.models.dtos.MailMessageDTO;
import com.npupas.api.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender emailSender;

    private final SpringTemplateEngine templateEngine;

    @Value("${mail.username}")
    private String username;

    public EmailServiceImpl(JavaMailSender emailSender, SpringTemplateEngine templateEngine) {
        this.emailSender = emailSender;
        this.templateEngine = templateEngine;
    }

    public void sendWelcomeEmail(MailMessageDTO mail) throws MessagingException, IOException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());

        helper.addAttachment("Términos y Condiciones.pdf", new ClassPathResource("statics/Terms&Conditions.pdf"));

        Context context = new Context();
        context.setVariables(mail.getProps());
        String html = templateEngine.process("welcome-email", context);
        helper.setTo(mail.getMailTo());
        helper.setText(html, true);
        helper.setSubject(mail.getSubject());
        helper.setSentDate(new Date());
        helper.setFrom(String.valueOf(new InternetAddress(mail.getFrom(), username)));

        emailSender.send(message);
    }

}

