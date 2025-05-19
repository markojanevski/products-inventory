package com.example.products_inventory.model;

import jakarta.persistence.*;
import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;

@Data
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Име е потребно")
    private String name;

    private String description;

    @NotNull(message = "Цена е потребна")
    @Min(value = 0, message = "Цената мора да биде > 0")
    private double price;

    @NotNull(message = "Количина е потребна")
    @Min(value = 0, message = "Колочината мора да биде > 0")
    private Integer quantityInStock;

    private String category;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String imageData;

}
