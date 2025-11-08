-- phpMyAdmin SQL Dump
-- version 5.2.3-1.fc42
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 08, 2025 at 12:10 AM
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
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `user`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Tomas', '', '2025-10-31 23:24:38', '2025-10-31 23:24:38'),
(2, 'Jacob', '', '2025-10-31 23:24:47', '2025-10-31 23:24:47');

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`id`, `name`) VALUES
(1, 'Gorra'),
(2, 'Medias');

-- --------------------------------------------------------

--
-- Table structure for table `product_items`
--

CREATE TABLE `product_items` (
  `id` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `color` varchar(20) NOT NULL,
  `price` varchar(20) NOT NULL,
  `stock` int(10) UNSIGNED NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `attributes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'JSON con los atributos extra de cada producto',
  `status` bit(1) NOT NULL COMMENT '0: Inactivo / 1: Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_items`
--

INSERT INTO `product_items` (`id`, `id_category`, `title`, `color`, `price`, `stock`, `image_url`, `attributes`, `status`) VALUES
(1, 1, 'Gorra Negra Clásica', 'Negra', '12000', 10, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"tipo\": \"Trucker\"}', b'1'),
(2, 1, 'Gorra Blanca Deportiva', 'Blanca', '12500', 8, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"tipo\": \"Snapback\"}', b'1'),
(3, 1, 'Gorra Azul Urbana', 'Azul', '13000', 6, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"tipo\": \"Flat\"}', b'1'),
(4, 1, 'Gorra Roja Casual', 'Roja', '11800', 12, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"tipo\": \"Trucker\"}', b'1'),
(5, 1, 'Gorra Gris Minimalista', 'Gris', '11900', 9, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"tipo\": \"Curva\"}', b'1'),
(6, 1, 'Gorra Verde Militar', 'Verde', '12200', 5, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"tipo\": \"Curva\"}', b'1'),
(7, 1, 'Gorra Amarilla Verano', 'Amarilla', '11500', 11, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"tipo\": \"Trucker\"}', b'1'),
(8, 1, 'Gorra Bordó Vintage', 'Bordó', '13000', 4, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"tipo\": \"Snapback\"}', b'1'),
(9, 2, 'Medias Negras Cortas', 'Negras', '3500', 20, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"caña\": \"Corta\"}', b'1'),
(10, 2, 'Medias Blancas Deportivas', 'Blancas', '3600', 18, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"caña\": \"Media\"}', b'1'),
(11, 2, 'Medias Grises Urbanas', 'Grises', '3400', 22, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"caña\": \"Larga\"}', b'1'),
(12, 2, 'Medias Rojas Clásicas', 'Rojas', '3300', 25, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"caña\": \"Media\"}', b'1'),
(13, 2, 'Medias Azules Básicas', 'Azules', '3400', 20, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"caña\": \"Corta\"}', b'1'),
(14, 2, 'Medias Verdes Running', 'Verdes', '3700', 17, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"caña\": \"Corta\"}', b'1'),
(15, 2, 'Medias Amarillas Retro', 'Amarillas', '3800', 15, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"caña\": \"Larga\"}', b'1'),
(16, 2, 'Medias Bordó Premium', 'Bordó', '4000', 10, 'https://www.newera.com.ar/cdn/shop/files/70515092_59FIFTY_59FIFTYGOLWARBLACKWHITE_GOLWAR_OTC_3QL.jpg?v=1759859183&width=1680', '{\"caña\": \"Media\"}', b'1');

-- --------------------------------------------------------

--
-- Table structure for table `product_orders`
--

CREATE TABLE `product_orders` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL COMMENT 'Nombre del comprador',
  `date` date NOT NULL DEFAULT current_timestamp(),
  `products` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'id, cantidad, precio unitario' CHECK (json_valid(`products`)),
  `total` varchar(20) NOT NULL
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
-- Indexes for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_items`
--
ALTER TABLE `product_items`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `product_items` ADD FULLTEXT KEY `titulo` (`title`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
