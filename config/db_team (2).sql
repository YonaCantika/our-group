-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 15, 2025 at 03:23 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_team`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id_cat` int NOT NULL,
  `nama` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id_cat`, `nama`) VALUES
(1, 'hewan'),
(2, 'buah'),
(12, 'Elektronik');

-- --------------------------------------------------------

--
-- Stand-in structure for view `data_buah`
-- (See below for the actual view)
--
CREATE TABLE `data_buah` (
`object` varchar(100)
,`img` varchar(255)
,`audio` text
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `data_hewan`
-- (See below for the actual view)
--
CREATE TABLE `data_hewan` (
`object` varchar(100)
,`img` varchar(255)
,`audio` text
);

-- --------------------------------------------------------

--
-- Table structure for table `object`
--

CREATE TABLE `object` (
  `id` int NOT NULL,
  `id_cat` int DEFAULT NULL,
  `object` varchar(100) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `audio` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `object`
--

INSERT INTO `object` (`id`, `id_cat`, `object`, `img`, `audio`) VALUES
(1, 1, 'Kucing', '', ''),
(2, 1, 'Anjing', '', NULL),
(3, 1, 'Gajah', NULL, NULL),
(4, 2, 'Apel', NULL, NULL),
(5, 2, 'Pisang', NULL, NULL),
(6, 2, 'Mangga', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `pass` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `pass`) VALUES
(1, 'yona', '02ab21448fdd7bc0693689118c4fd6a33cfbc1cce33827b70cc67bc6');

-- --------------------------------------------------------

--
-- Structure for view `data_buah`
--
DROP TABLE IF EXISTS `data_buah`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `data_buah`  AS SELECT `object`.`object` AS `object`, `object`.`img` AS `img`, `object`.`audio` AS `audio` FROM `object` WHERE (`object`.`id_cat` = 2)  ;

-- --------------------------------------------------------

--
-- Structure for view `data_hewan`
--
DROP TABLE IF EXISTS `data_hewan`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `data_hewan`  AS SELECT `object`.`object` AS `object`, `object`.`img` AS `img`, `object`.`audio` AS `audio` FROM `object` WHERE (`object`.`id_cat` = 1)  ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_cat`);

--
-- Indexes for table `object`
--
ALTER TABLE `object`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_object_category` (`id_cat`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id_cat` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `object`
--
ALTER TABLE `object`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `object`
--
ALTER TABLE `object`
  ADD CONSTRAINT `fk_object_category` FOREIGN KEY (`id_cat`) REFERENCES `category` (`id_cat`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
