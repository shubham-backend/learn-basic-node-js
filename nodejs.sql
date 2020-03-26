-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 26, 2020 at 04:47 PM
-- Server version: 5.7.29-0ubuntu0.16.04.1
-- PHP Version: 7.2.28-3+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs`
--

-- --------------------------------------------------------

--
-- Table structure for table `app_users`
--

CREATE TABLE `app_users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `app_users`
--

INSERT INTO `app_users` (`id`, `name`, `email`, `phone`, `password`, `created_at`) VALUES
(4, 'Shubham', 'shubham@yopmail.com', '8181819191', '1234567', '2020-03-13 13:35:57'),
(5, 'Shubham', 'shubham1@yopmail.com', '8181819191', '1234567', '2020-03-13 14:57:17'),
(6, 'Shubham123', 'shubham123@yopmail.com', '9191919191', '1234567', '2020-03-16 11:07:26'),
(7, 'Shubham1234', 'shubham1234@yopmail.com', '9191919191', '1234567', '2020-03-16 11:07:46'),
(8, 'Shubham12345', 'shubham12345@yopmail.com', '9191919191', '1234567', '2020-03-16 11:08:29');

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contact_us`
--

INSERT INTO `contact_us` (`id`, `name`, `email`, `message`, `created_at`) VALUES
(1, 'Shubham3', 'Shubham3@yopmail.com', 'Hi,This is contact us message. ', '2020-03-12 16:19:32'),
(2, 'Shubham2', 'shubham2@yopmail.com', 'Hi, Test contact us form of node Js', '2020-03-12 16:19:32'),
(3, 'Shubham1', 'shubham1@yopmail.com', 'Hi This is my first message for Node Js', '2020-03-12 17:11:40');

-- --------------------------------------------------------

--
-- Table structure for table `demos`
--

CREATE TABLE `demos` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `demos`
--

INSERT INTO `demos` (`id`, `username`, `birthday`, `createdAt`, `updatedAt`) VALUES
(1, 'Shubham', '1996-08-02 18:30:00', '2020-03-18 06:52:07', '2020-03-18 06:52:07'),
(2, 'Shubham', '1996-08-02 18:30:00', '2020-03-18 07:03:33', '2020-03-18 07:03:33');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Shubham Kumar', 'shubham@yopmail.com', '8787878790', '1234567', '2020-03-26 12:54:38', '2020-03-26 11:07:45'),
(2, 'Shubham1', 'shubham1@yopmail.com', '8787989898', '1234567', '2020-03-26 14:07:13', '2020-03-26 11:07:45'),
(3, 'Shubham2', 'shubham2@yopmail.com', '8787878799', '1234567', '2020-03-26 09:36:38', '2020-03-26 09:36:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `app_users`
--
ALTER TABLE `app_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `demos`
--
ALTER TABLE `demos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `app_users`
--
ALTER TABLE `app_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `demos`
--
ALTER TABLE `demos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
