-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 07, 2023 at 05:38 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projectdb`
--
CREATE DATABASE IF NOT EXISTS `ProjectDB` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ProjectDB`;

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `itemID` int(11) NOT NULL,
  `supplierID` varchar(50) NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `ImageFile` varchar(50) NOT NULL,
  `itemDescription` text DEFAULT NULL,
  `stockItemQty` int(11) NOT NULL DEFAULT 0,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`itemID`, `supplierID`, `itemName`, `ImageFile`, `itemDescription`, `stockItemQty`, `price`) VALUES
(1, 's001', 'Local Potato (1 pc)', '1.png', 'The potato is a starchy food, a tuber of the plant Solanum tuberosum and is a root vegetable native to the Americas. The plant is a perennial in the nightshade family Solanaceae.', 4371, 16),
(2, 's002', 'Australia Carrot (1 pc)', '2.png', 'The carrot (Daucus carota subsp. sativus) is a root vegetable, typically orange in color, though purple, black, red, white, and yellow cultivars exist, all of which are domesticated forms of the wild carrot, Daucus carota, native to Europe and Southwestern Asia. The plant probably originated in Persia and was originally cultivated for its leaves and seeds. The most commonly eaten part of the plant is the taproot, although the stems and leaves are also eaten. The domestic carrot has been selectively bred for its enlarged, more palatable, less woody-textured taproot.', 276, 25),
(3, 's002', 'Red Apple (1 pc)', '3.png', 'An apple is an edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found today. Apples have been grown for thousands of years in Asia and Europe and were brought to North America by European colonists. Apples have religious and mythological significance in many cultures, including Norse, Greek, and European Christian tradition.', 0, 6),
(4, 's003', 'Red Apple (3 pcs)', '4.png', 'Apples grown from seed tend to be very different from those of their parents, and the resultant fruit frequently lacks desired characteristics. Generally, apple cultivars are propagated by clonal grafting onto rootstocks. Apple trees grown without rootstocks tend to be larger and much slower to fruit after planting. Rootstocks are used to control the speed of growth and the size of the resulting tree, allowing for easier harvesting.', 2286, 15),
(5, 's003', 'Orange (1 pc)', '5.png', 'An orange is a fruit of various citrus species in the family Rutaceae (see list of plants known as orange); it primarily refers to Citrus × sinensis, which is also called sweet orange, to distinguish it from the related Citrus × aurantium, referred to as bitter orange. The sweet orange reproduces asexually (apomixis through nucellar embryony); varieties of sweet orange arise through mutations.', 1078, 8),
(6, 's002', 'Mango (2 pcs)', '6.png', 'A mango is an edible stone fruit produced by the tropical tree Mangifera indica. It is believed to have originated between northwestern Myanmar, Bangladesh, and northeastern India. M. indica has been cultivated in South and Southeast Asia since ancient times resulting in two types of modern mango cultivars: the \"Indian type\" and the \"Southeast Asian type\". Other species in the genus Mangifera also produce edible fruits that are also called \"mangoes\", the majority of which are found in the Malesian ecoregion.', 473, 52),
(7, 's002', 'Lemon (1 pc)', '7.png', 'The lemon (Citrus limon) is a species of small evergreen trees in the flowering plant family Rutaceae, native to Asia, primarily Northeast India (Assam), Northern Myanmar or China.', 1315, 5),
(8, 's001', 'Apple03', '8.png', 'Good', 64, 13),
(9, 's002', 'Salmon (8 kg)', '9.jpeg', 'Form Norway', 300, 546);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderID` int(11) NOT NULL,
  `purchaseManagerID` varchar(50) NOT NULL,
  `orderDateTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deliveryAddress` varchar(255) NOT NULL,
  `deliveryDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderID`, `purchaseManagerID`, `orderDateTime`, `deliveryAddress`, `deliveryDate`) VALUES
(1, 'p001', '2023-03-24 13:12:13', 'Unit 4015/Fl. Silvercord Tower 230 Canton Road', '2023-09-18'),
(2, 'p001', '2023-04-10 14:10:20', 'Flat 8, Chates Farm Court, John Street, Hong Kong', '2023-01-15'),
(3, 'p002', '2023-07-07 07:38:08', '39 Cadogan St Kennedy Town, Central And Western District', '0000-00-00'),
(4, 'p001', '2023-05-28 12:55:30', 'Unit 4077/Fl. Silvercord Tower 230 Canton Road', '2023-07-13'),
(5, 'p003', '2023-05-28 15:01:30', 'TKL LWL', '2023-06-08'),
(6, 'p002', '2023-05-28 15:14:46', '39 Cadogan St Kennedy Town, Central And Western District', '2023-09-20'),
(7, 'p003', '2023-05-28 15:17:55', '37/F TKL LWL ', '2023-06-08'),
(8, 'p003', '2023-05-28 16:23:57', '37/F TKL LWL ', '2023-05-25'),
(9, 'p003', '2023-05-28 16:31:48', '37/F TKL LWL ', '2023-06-10'),
(10, 'p001', '2023-06-11 11:17:46', 'Unit 4077/Fl. Silvercord Tower 230 Canton Road', '2023-06-28'),
(11, 'p001', '2023-06-11 11:19:23', 'Unit 4077/Fl. Silvercord Tower 230 Canton Road', '2023-06-22'),
(15, 'p003', '2023-07-03 15:34:26', '37/F TKL LWL ', '2023-07-06'),
(16, 'p003', '2023-07-03 15:34:52', '37/F TKL LWL ', '2023-07-05'),
(20, 'p001', '2023-07-06 11:50:54', 'Unit 4077/Fl. Silvercord Tower 230 Canton Road', '2023-07-06'),
(22, 'p003', '2023-07-07 10:42:48', '37/F TKL LWL ', '2023-07-21'),
(23, 'p003', '2023-07-07 10:43:38', '37/F TKL LWL ', '2023-07-07'),
(24, 'p003', '2023-07-07 10:50:47', '37/F TKL LWL ', '2023-07-29'),
(25, 'p001', '2023-07-07 10:59:45', 'Unit 4077/Fl. Silvercord Tower 230 Canton Road', '2023-07-28');

-- --------------------------------------------------------

--
-- Table structure for table `ordersitem`
--

CREATE TABLE `ordersitem` (
  `orderID` int(11) NOT NULL,
  `itemID` int(11) NOT NULL,
  `orderQty` int(5) NOT NULL,
  `itemPrice` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ordersitem`
--

INSERT INTO `ordersitem` (`orderID`, `itemID`, `orderQty`, `itemPrice`) VALUES
(1, 1, 101, 16),
(1, 2, 150, 25),
(2, 3, 100, 6),
(3, 5, 100, 8),
(3, 6, 200, 52),
(4, 1, 300, 16),
(4, 5, 100, 8),
(5, 1, 100, 16),
(5, 2, 200, 25),
(5, 4, 500, 15),
(5, 5, 150, 8),
(5, 6, 80, 52),
(6, 1, 300, 16),
(6, 2, 87, 25),
(6, 6, 111, 52),
(7, 1, 1000, 16),
(8, 3, 300, 6),
(9, 1, 100, 16),
(10, 5, 10, 8),
(11, 1, 10, 16),
(15, 5, 10, 8),
(16, 7, 2, 5),
(20, 3, 8, 6),
(22, 3, 1692, 6),
(23, 7, 10, 5),
(24, 1, 12, 16),
(24, 2, 24, 25),
(24, 4, 10, 15),
(24, 5, 2, 8),
(24, 6, 27, 52),
(24, 7, 28, 5),
(24, 8, 41, 13),
(25, 9, 50, 546);

-- --------------------------------------------------------

--
-- Table structure for table `purchasemanager`
--

CREATE TABLE `purchasemanager` (
  `purchaseManagerID` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `managerName` varchar(100) NOT NULL,
  `contactNumber` varchar(30) NOT NULL,
  `warehouseAddress` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchasemanager`
--

INSERT INTO `purchasemanager` (`purchaseManagerID`, `password`, `managerName`, `contactNumber`, `warehouseAddress`) VALUES
('p001', 'p123', 'Chan Tai Man', '55433210', 'Unit 4077/Fl. Silvercord Tower 230 Canton Road'),
('p002', 'p111', 'Wong Ka Ho', '55553333', '39 Cadogan St Kennedy Town, Central And Western District'),
('p003', 'p333', 'Chan ka Chung', '55450349', '37/F TKL LWL ');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `supplierID` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `companyName` varchar(100) NOT NULL,
  `contactName` varchar(100) NOT NULL,
  `contactNumber` varchar(30) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`supplierID`, `password`, `companyName`, `contactName`, `contactNumber`, `address`) VALUES
('s001', 's123', 'Seafood Company', 'Chan Ming Yiu', '28475621', '2 Bonham Std W,Sheung Wan '),
('s002', 's123', 'Fruit Company', 'Wong Kwan', '38574832', 'Greenfield Tower East,  Tsim Sha Tsui'),
('s003', 's123', 'Apple Company', 'Cheung Tai Man', '38576942', '8 Queen Rd C, Central District');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`itemID`),
  ADD KEY `FKItem544686` (`supplierID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderID`),
  ADD KEY `FKOrders266694` (`purchaseManagerID`);

--
-- Indexes for table `ordersitem`
--
ALTER TABLE `ordersitem`
  ADD PRIMARY KEY (`orderID`,`itemID`),
  ADD KEY `FKOrdersItem40035` (`itemID`),
  ADD KEY `FKOrdersItem51349` (`orderID`);

--
-- Indexes for table `purchasemanager`
--
ALTER TABLE `purchasemanager`
  ADD PRIMARY KEY (`purchaseManagerID`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`supplierID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `FKItem544686` FOREIGN KEY (`supplierID`) REFERENCES `supplier` (`supplierID`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FKOrders266694` FOREIGN KEY (`purchaseManagerID`) REFERENCES `purchasemanager` (`purchaseManagerID`);

--
-- Constraints for table `ordersitem`
--
ALTER TABLE `ordersitem`
  ADD CONSTRAINT `FKOrdersItem40035` FOREIGN KEY (`itemID`) REFERENCES `item` (`itemID`),
  ADD CONSTRAINT `FKOrdersItem51349` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
