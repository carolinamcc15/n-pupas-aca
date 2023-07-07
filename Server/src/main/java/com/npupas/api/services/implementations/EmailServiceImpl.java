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

    @Override
    public void sendSalesBranchesEmail(MailMessageDTO mail, String pupuseria, SalesBranchesDTO sales) throws MessagingException, IOException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());

        BufferedImage chart = createChart(sales.getSalesBranches());

        Context context = new Context();
        context.setVariables(mail.getProps());
        context.setVariable("pupuseria", pupuseria);
        context.setVariable("totalSales", sales.getSaleTotal());
        context.setVariable("averageSalesPerDay", sales.getSaleAverageByDay());
        context.setVariable("averageSalesPerMonth", sales.getSaleAverageByMonth());

        String chartImageBase64 = convertChartToBase64(chart);
        context.setVariable("chartImage", chartImageBase64);
        context.setVariable("salesBranches", sales.getSalesBranches());

        String html = templateEngine.process("branch-sales", context);
        helper.setTo(mail.getMailTo());
        helper.setText(html, true);
        helper.setSubject(mail.getSubject());
        helper.setSentDate(new Date());
        helper.setFrom(String.valueOf(new InternetAddress(mail.getFrom(), username)));

        emailSender.send(message);
    }
    public static BufferedImage createChart(List<Map<String, Double>> salesBranches) {
        DefaultPieDataset dataset = new DefaultPieDataset();

        for (Map<String, Double> branch : salesBranches) {
            String branchName = branch.keySet().iterator().next();
            Double salesValue = branch.get(branchName);

            dataset.setValue(branchName, salesValue);
        }

        JFreeChart chart = ChartFactory.createPieChart("", dataset, false, false, false);
        chart.setBackgroundPaint(Color.WHITE);

        int width = 820;
        int height = 540;
        BufferedImage chartImage = chart.createBufferedImage(width, height);

        return chartImage;
    }

    private String convertChartToBase64(BufferedImage chart) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ImageIO.write(chart, "png", outputStream);
        byte[] chartImageBytes = outputStream.toByteArray();
        return Base64.getEncoder().encodeToString(chartImageBytes);
    }
}

