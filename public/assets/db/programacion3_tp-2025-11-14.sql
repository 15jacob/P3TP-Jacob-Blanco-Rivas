-- phpMyAdmin SQL Dump
-- version 5.2.3-1.fc42
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 14, 2025 at 11:35 PM
-- Server version: 10.11.11-MariaDB
-- PHP Version: 8.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `programacion3_tp`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `user`, `password`) VALUES
(1, 'Tomas', '$2a$10$qJPMgS1hROn0LguuxKVkMuIdbmvXCsinhq9iAbF5orXi2g9HWAFo.'),
(2, 'Jacob', '$2a$10$qJPMgS1hROn0LguuxKVkMuIdbmvXCsinhq9iAbF5orXi2g9HWAFo.');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Gorra', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Medias', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `product_items`
--

CREATE TABLE `product_items` (
  `id` int(11) NOT NULL,
  `id_category` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `color` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `stock` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `attributes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`attributes`)),
  `status` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_items`
--

INSERT INTO `product_items` (`id`, `id_category`, `title`, `color`, `price`, `stock`, `image_url`, `attributes`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Gorra Negra Clásica', 'Negra', '12000', 10, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"tipo\": \"Trucker\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 1, 'Gorra Blanca Deportiva', 'Blanca', '12500', 8, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"tipo\": \"Snapback\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 1, 'Gorra Azul Urbana', 'Azul', '13000', 6, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"tipo\": \"Flat\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 1, 'Gorra Roja Casual', 'Roja', '11800', 12, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"tipo\": \"Trucker\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 1, 'Gorra Gris Minimalista', 'Gris', '11900', 9, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"tipo\": \"Curva\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 1, 'Gorra Verde Militar', 'Verde', '12200', 5, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"tipo\": \"Curva\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 1, 'Gorra Amarilla Verano', 'Amarilla', '11500', 11, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"tipo\": \"Trucker\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 1, 'Gorra Bordó Vintage', 'Bordó', '13000', 4, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"tipo\": \"Snapback\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 2, 'Medias Negras Cortas', 'Negras', '3500', 20, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"caña\": \"Corta\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 2, 'Medias Blancas Deportivas', 'Blancas', '3600', 18, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"caña\": \"Media\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 2, 'Medias Grises Urbanas', 'Grises', '3400', 22, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"caña\": \"Larga\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 2, 'Medias Rojas Clásicas', 'Rojas', '3300', 25, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"caña\": \"Media\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 2, 'Medias Azules Básicas', 'Azules', '3400', 20, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"caña\": \"Corta\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 2, 'Medias Verdes Running', 'Verdes', '3700', 17, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"caña\": \"Corta\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 2, 'Medias Amarillas Retro', 'Amarillas', '3800', 15, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"caña\": \"Larga\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 2, 'Medias Bordó Premium', 'Bordó', '4000', 10, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"caña\": \"Media\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `product_orders`
--

CREATE TABLE `product_orders` (
  `id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` varchar(255) NOT NULL,
  `id_order` int(11) NOT NULL,
  `id_product` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_items`
--
ALTER TABLE `product_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_category` (`id_category`);
ALTER TABLE `product_items` ADD FULLTEXT KEY `titulo` (`title`);

--
-- Indexes for table `product_orders`
--
ALTER TABLE `product_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_order` (`id_order`),
  ADD KEY `id_product` (`id_product`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product_items`
--
ALTER TABLE `product_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `product_orders`
--
ALTER TABLE `product_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product_items`
--
ALTER TABLE `product_items`
  ADD CONSTRAINT `product_items_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `product_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `product_orders`
--
ALTER TABLE `product_orders`
  ADD CONSTRAINT `product_orders_ibfk_33` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `product_orders_ibfk_34` FOREIGN KEY (`id_product`) REFERENCES `product_items` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
