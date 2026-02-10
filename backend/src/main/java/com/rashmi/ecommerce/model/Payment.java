package com.rashmi.ecommerce.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;

    private BigDecimal amount;

    private String paymentMethod; // STRIPE, PAYPAL

    private String status; // PENDING, COMPLETED, FAILED

    private String transactionId;

    private LocalDateTime paymentDate = LocalDateTime.now();
}
