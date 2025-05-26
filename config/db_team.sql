-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 25, 2025 at 09:20 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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
  `id_cat` int(11) NOT NULL,
  `nama` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `id` int(11) NOT NULL,
  `id_cat` int(11) DEFAULT NULL,
  `object` varchar(100) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `audio` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `object`
--

INSERT INTO `object` (`id`, `id_cat`, `object`, `img`, `audio`) VALUES
(7, 1, 'Serigala', 'serigala.jpg', 'serigala.mp3'),
(8, 1, 'Pinguin', 'pinguin.jpg', 'pinguin.mp3'),
(9, 1, 'Harimau', 'harimau.jpg', 'harimau.mp3'),
(10, 1, 'Beruang', 'beruang.jpg', 'beruang.mp3'),
(11, 12, 'Televisi', 'televisi.jpg', 'televisi.mp3'),
(12, 12, 'Radio', 'radio.jpg', 'radio.mp3'),
(13, 12, 'hanphone', 'hanphone.jpg', 'hanphone.mp3'),
(14, 12, 'Laptop', 'laptop.jpg', 'laptop.mp3'),
(15, 2, 'Apel', 'apel.jpg', 'apel.mp3'),
(16, 2, 'Anggur', 'anggur.jpg', 'anggur.mp3'),
(17, 2, 'Pisang', 'pisang.jpg', 'pisang.mp3');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `pass`) VALUES
(1, 'yona', '02ab21448fdd7bc0693689118c4fd6a33cfbc1cce33827b70cc67bc6'),
(4, 'atmin', '$argon2i$v=19$m=16,t=2,p=1$TkxIVTN2ejlkejFGeUdSQg$Ws78Z0Si+5mfSAydWnLC6Q');

-- --------------------------------------------------------

--
-- Structure for view `data_buah`
--
DROP TABLE IF EXISTS `data_buah`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `data_buah`  AS SELECT `object`.`object` AS `object`, `object`.`img` AS `img`, `object`.`audio` AS `audio` FROM `object` WHERE `object`.`id_cat` = 2 ;

-- --------------------------------------------------------

--
-- Structure for view `data_hewan`
--
DROP TABLE IF EXISTS `data_hewan`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `data_hewan`  AS SELECT `object`.`object` AS `object`, `object`.`img` AS `img`, `object`.`audio` AS `audio` FROM `object` WHERE `object`.`id_cat` = 1 ;

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
  MODIFY `id_cat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `object`
--
ALTER TABLE `object`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
