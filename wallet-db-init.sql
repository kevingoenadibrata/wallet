CREATE USER 'nodeuser'@'%' IDENTIFIED BY 'password123';
GRANT ALL ON *.* TO 'nodeuser'@'%';
ALTER USER 'nodeuser' IDENTIFIED WITH mysql_native_password BY 'password123';
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS wallet;
USE wallet;

CREATE TABLE `Wallets` (
  `id` varchar(255) NOT NULL,
  `owned_by` varchar(255) NOT NULL,
  `status` enum('enabled','disabled') NOT NULL,
  `balance` decimal(65,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idWallets_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Deposits` (
  `id` varchar(255) NOT NULL,
  `reference_id` varchar(255) NOT NULL,
  `deposit_by` varchar(255) NOT NULL,
  `deposit_at` datetime NOT NULL,
  `amount` decimal(65,2) NOT NULL,
  `wallet_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`wallet_id`),
  CONSTRAINT `id` FOREIGN KEY (`wallet_id`) REFERENCES `Wallets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Withdrawals` (
  `id` varchar(255) NOT NULL,
  `wallet_id` varchar(255) NOT NULL,
  `amount` decimal(65,2) NOT NULL,
  `reference_id` varchar(255) NOT NULL,
  `withdrawn_by` varchar(255) NOT NULL,
  `withdrawn_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`wallet_id`),
  CONSTRAINT `wallet_id` FOREIGN KEY (`wallet_id`) REFERENCES `Wallets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

