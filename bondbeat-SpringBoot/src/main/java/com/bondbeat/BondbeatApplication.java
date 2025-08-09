package com.bondbeat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BondbeatApplication {

	public static void main(String[] args) {
		SpringApplication.run(BondbeatApplication.class, args);
		System.out.println("DONE!");
	}
}
