-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2018-11-30 09:41:26
-- 服务器版本： 10.1.36-MariaDB
-- PHP 版本： 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `xz`
--

-- --------------------------------------------------------

--
-- 表的结构 `xz_news`
--

CREATE TABLE `xz_news` (
  `id` int(11) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `ctime` datetime DEFAULT NULL,
  `point` int(11) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `xz_news`
--

INSERT INTO `xz_news` (`id`, `title`, `ctime`, `point`, `img_url`, `content`) VALUES
(1, '新闻标题', '2018-11-29 16:30:55', 0, 'http://127.0.0.1:3000/img/1.jpg', ''),
(2, '新闻标题', '2018-11-29 16:30:55', 0, 'http://127.0.0.1:3000/img/2.jpg', '..'),
(3, '新闻标题', '2018-11-29 16:30:56', 0, 'http://127.0.0.1:3000/img/3.jpg', '..'),
(4, '新闻标题', '2018-11-29 16:30:56', 0, 'http://127.0.0.1:3000/img/4.jpg', '..'),
(5, '新闻标题', '2018-11-29 16:30:56', 0, 'http://127.0.0.1:3000/img/1.jpg', '..'),
(6, '新闻标题', '2018-11-29 16:30:56', 0, 'http://127.0.0.1:3000/img/4.jpg', '..'),
(7, '新闻标题', '2018-11-29 16:30:56', 0, 'http://127.0.0.1:3000/img/2.jpg', '..'),
(8, '新闻标题', '2018-11-29 16:30:56', 0, 'http://127.0.0.1:3000/img/1.jpg', '..'),
(9, '新闻标题', '2018-11-29 16:30:56', 0, 'http://127.0.0.1:3000/img/3.jpg', '..'),
(10, '新闻标题', '2018-11-29 16:30:56', 0, 'http://127.0.0.1:3000/img/3.jpg', '..'),
(11, '新闻标题', '2018-11-29 16:30:56', 0, 'http://127.0.0.1:3000/img/1.jpg', '..'),
(12, '新闻标题', '2018-11-29 16:30:56', 0, 'http://127.0.0.1:3000/img/2.jpg', '..'),
(13, '新闻标题', '2018-11-29 16:30:56', 0, 'http://127.0.0.1:3000/img/4.jpg', '..'),
(14, '新闻标题', '2018-11-29 16:30:56', 0, 'http://127.0.0.1:3000/img/3.jpg', '..'),
(15, '新闻标题', '2018-11-29 16:30:56', 0, 'http://127.0.0.1:3000/img/2.jpg', '..'),
(16, '新闻标题', '2018-11-29 16:30:56', 0, 'http://127.0.0.1:3000/img/1.jpg', '..'),
(17, '新闻标题', '2018-11-29 16:30:56', 0, 'http://127.0.0.1:3000/img/2.jpg', '..'),
(18, '新闻标题', '2018-11-29 16:30:56', 0, 'http://127.0.0.1:3000/img/4.jpg', '..'),
(19, '新闻标题', '2018-11-29 16:30:56', 0, 'http://127.0.0.1:3000/img/3.jpg', '..'),
(20, '新闻标题', '2018-11-29 16:30:56', 0, 'http://127.0.0.1:3000/img/1.jpg', '..');

--
-- 转储表的索引
--

--
-- 表的索引 `xz_news`
--
ALTER TABLE `xz_news`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `xz_news`
--
ALTER TABLE `xz_news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
