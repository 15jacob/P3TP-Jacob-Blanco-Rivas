-- phpMyAdmin SQL Dump
-- version 5.2.3-1.fc42
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 24, 2025 at 11:35 PM
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
(1, 1, 'Gorra Negra Trucker', 'Negro', '12000', 10, '/assets/img/trucker-negra.webp', '{\"tipo\": \"Trucker\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 1, 'Gorra Blanca Trucker', 'Blanco', '12500', 8, '/assets/img/trucker-blanca.webp', '{\"tipo\": \"Trucker\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 1, 'Gorra Azul Trucker', 'Azul', '13000', 6, '/assets/img/trucker-azul.webp', '{\"tipo\": \"Trucker\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 1, 'Gorra Roja Snapback', 'Rojo', '11800', 12, '/assets/img/snapback-roja.webp', '{\"tipo\": \"Snapback\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 1, 'Gorra Azul Snapback', 'Azul', '11900', 9, '/assets/img/snapback-azul.webp', '{\"tipo\": \"Snapback\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 1, 'Gorra Verde Snapback', 'Verde', '12200', 5, '/assets/img/snapback-verde.webp', '{\"tipo\": \"Snapback\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 1, 'Gorra Negra Fitted', 'Negro', '11500', 11, '/assets/img/fitted-negra.webp', '{\"tipo\": \"Fitted\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 1, 'Gorra Verde Fitted', 'Verde', '13000', 4, '/assets/img/fitted-verde.webp', '{\"tipo\": \"Fitted\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 2, 'Media Negra Corta', 'Negro', '3500', 20, '/assets/img/corta-negro.webp', '{\"caña\": \"Corta\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 2, 'Media Blanca Corta', 'Blanco', '3600', 18, '/assets/img/corta-blanco.webp', '{\"caña\": \"Corta\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 2, 'Media Azul Corta', 'Azul', '3400', 22, '/assets/img/corta-azul.webp', '{\"caña\": \"Corta\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 2, 'Media Negra Media', 'Negro', '3300', 25, '/assets/img/media-negra.jpg', '{\"caña\": \"Media\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 2, 'Media Azul Media', 'Azul', '3400', 20, '/assets/img/media-azul.webp', '{\"caña\": \"Corta\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 2, 'Media Verde Media', 'Verde', '3700', 17, '/assets/img/media-verde.webp', '{\"caña\": \"Corta\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 2, 'Media Negra Larga', 'Negro', '3800', 15, '/assets/img/larga-negro.webp', '{\"caña\": \"Larga\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 2, 'Media Azul Larga', 'Azul', '4000', 10, '/assets/img/larga-azul.webp', '{\"caña\": \"Larga\"}', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

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

-- Insertar 2 órdenes en la tabla `orders`
INSERT INTO `orders` (`name`, `date`) VALUES
('Cliente A', '2025-11-20 10:30:00'),
('Cliente B', '2025-11-20 11:45:00');

-- Insertar 2 relaciones en la tabla `product_orders` (asociando productos a las órdenes)
INSERT INTO `product_orders` (`quantity`, `price`, `id_order`, `id_product`) VALUES
(1, '12000', 1, 1), -- Cliente A compra 1 unidad del producto ID 1
(3, '3500', 2, 9);  -- Cliente B compra 3 unidades del producto ID 9