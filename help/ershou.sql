-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2018-02-26 11:24:08
-- 服务器版本： 10.1.10-MariaDB
-- PHP Version: 7.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ershou`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE `admin` (
  `id` int(10) NOT NULL,
  `account` varchar(20) CHARACTER SET utf8 NOT NULL,
  `password` varchar(20) CHARACTER SET utf8 NOT NULL,
  `nicheng` varchar(50) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`id`, `account`, `password`, `nicheng`) VALUES
(1, '10086', '10086', '管理员');

-- --------------------------------------------------------

--
-- 表的结构 `fenlei`
--

CREATE TABLE `fenlei` (
  `id` int(10) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `fenlei`
--

INSERT INTO `fenlei` (`id`, `name`) VALUES
(1, '电脑数码'),
(2, '运动户外'),
(3, '服饰鞋包'),
(4, '日用百货'),
(5, '礼品钟表'),
(7, 'ttt');

-- --------------------------------------------------------

--
-- 表的结构 `liuyan`
--

CREATE TABLE `liuyan` (
  `id` int(10) NOT NULL,
  `content` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `wupinid` int(10) NOT NULL,
  `studentid` int(10) NOT NULL,
  `addtime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `liuyan`
--

INSERT INTO `liuyan` (`id`, `content`, `wupinid`, `studentid`, `addtime`) VALUES
(1, '留言测试', 3, 1, '2018-02-14 00:00:00'),
(2, '测试的', 3, 1, '2018-02-22 12:15:00'),
(3, '新测试2', 3, 2, '2018-02-22 12:17:00'),
(4, '评论测试', 6, 3, '2018-02-22 12:24:00'),
(5, 'dwadaw ', 6, 2, '2018-02-22 12:33:00');

-- --------------------------------------------------------

--
-- 表的结构 `student`
--

CREATE TABLE `student` (
  `id` int(10) NOT NULL,
  `account` varchar(20) CHARACTER SET utf8 NOT NULL,
  `password` varchar(20) CHARACTER SET utf8 NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8 NOT NULL,
  `nicheng` varchar(50) CHARACTER SET utf8 NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `qianming` varchar(1000) CHARACTER SET utf8 DEFAULT NULL,
  `touxiang` varchar(50) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `student`
--

INSERT INTO `student` (`id`, `account`, `password`, `phone`, `nicheng`, `name`, `qianming`, `touxiang`) VALUES
(1, '01', '123', '12345678910', 'baby', '马化腾', '马化腾的个性签名', '/uploads/touxiang/1-mqyun.jpg'),
(2, '02', '123', '110', 'mht', '马化腾', NULL, '/uploads/touxiang/2-adwad.jpg'),
(3, '03', '123', '120', '刘宝宝', '刘强东', '个性签名', '/uploads/touxiang/3-touxiang2.jpg'),
(4, '1234567890', '111', '17855831221', 'dwadwa', '未达到', NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `wupin`
--

CREATE TABLE `wupin` (
  `id` int(10) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `introduce` varchar(10000) CHARACTER SET utf8 NOT NULL,
  `price` varchar(20) CHARACTER SET utf8 NOT NULL,
  `fenleiid` int(10) NOT NULL,
  `studentid` int(10) NOT NULL,
  `gmstudentid` int(10) NOT NULL,
  `img` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `addtime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `wupin`
--

INSERT INTO `wupin` (`id`, `name`, `introduce`, `price`, `fenleiid`, `studentid`, `gmstudentid`, `img`, `addtime`) VALUES
(3, 'test', 'test introduce', '120.00', 3, 1, 0, '/uploads/wupinimg/3-2-1-u=1328943340,2797879178&fm=200&gp=0.jpg', '2018-02-26 14:33:36'),
(6, '自行车', '价格实惠！服务到位！本店店名(彤酷.酷车)（地处交通便利，地铁,公交到达本店）看车加本店微信 或者来电咨询！本店是实体经营13年的老店！有营业执照！各种经营手续齐全！（需要购车的朋友可以放心购买！）分期购买电动车电摩办理条件：1：年满18周岁2：携带 本人 身份证 +银行卡（0首付直接购买本店10000元以内任意车型！）3：5分钟即可办理成功提车！注：（无论您有没有工作！只要满足以上条件都可到本店办理分期付款！ 来之前请先联系本店！）我们有多家分期公司合作，分期首付最低0元！最低利息！可自由提前还款,（提前还款不收利息）广大客户有着多选择性的选着分期公司,通过率高达99%.学生更有支持零 首付 零 利息注意：离本店远的可以直接滴滴打车到本店（车费本店直接报销），购车成功连人带车免费送到家！本店所售车型：迅鹰 雷霆王 劲战 鬼火1代 鬼火2代 战速 GTR 大龟王 小龟王 城市铁男 BWS 祖玛 聚隆 骠骑 T3 T6 塞趴 等高端车 车型配置高端，前减震仿法斯特奶瓶减震，后减震气瓶减震 加宽真空胎，前后大鲍鱼碟刹，浙江大厂车身塑件加厚型，摩托车车架，彩色数字显示液晶仪表，真皮座垫！买车就送：雨衣，头盔等~!!本店出售的车子一律终身保修!!本店还提供电摩改装定制服务:1速度改装 60-100km/h 可定制，太快就危险了！2 制动距离刹车改装:前后大鲍鱼对4活塞卡钳，制动距离更短！更安全！3整车舒适性提升: 使用知名厂商避震对整车前后避震进行更换改装，大大提升车子的舒适性自己安全性！4 整车美观提升: 定做电镀壳大大提升车辆美观百分百回头率！5 整车安全性提升: 车型速度提升的情况下，对整车车架进行加固，使用加强杆，大大提升车型行驶稳定性以及安全性！6 里程提升: 可使用96v 120v 144v分体/一体仓提升电瓶个数增加车辆续航里程，也可上锂电池！温馨提醒：价格偏离市场行情价位的均属翻新、山寨、组装类非正品电车 需谨慎！坚决抵制 虚假价格、虚假信息、以次充好、不诚信商家的欺骗行为我们是实体店店面销售！本店地圵:升州路292-8号三山街地铁向西1000米 联系我时，请说明是在南京赶集网二手自行车看到的转让信息，谢谢。', '456.00', 4, 3, 0, '/uploads/wupinimg/6-timg.jpeg', '2018-02-26 14:51:36');

-- --------------------------------------------------------

--
-- 表的结构 `xunwu`
--

CREATE TABLE `xunwu` (
  `id` int(10) NOT NULL,
  `content` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `studentid` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `xunwu`
--

INSERT INTO `xunwu` (`id`, `content`, `studentid`) VALUES
(1, '寻物测试', '1'),
(2, '新测试新测试新测试新测试新测试新测试新测试新测试新测试新测试新测试新测试新测试新测试新测试新测试新测试新测试新测试新测试新测试新测试新测试新测试', '2'),
(3, '寻物', '3');

-- --------------------------------------------------------

--
-- 表的结构 `xunwuliuyan`
--

CREATE TABLE `xunwuliuyan` (
  `id` int(10) NOT NULL,
  `content` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `xunwuid` int(10) NOT NULL,
  `studentid` int(10) NOT NULL,
  `addtime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `xunwuliuyan`
--

INSERT INTO `xunwuliuyan` (`id`, `content`, `xunwuid`, `studentid`, `addtime`) VALUES
(1, '寻物恢复1', 1, 1, '2018-02-26 15:36:09'),
(2, '111', 2, 1, '2018-02-26 15:36:23'),
(3, 'test', 1, 1, '2018-02-26 15:44:33');

-- --------------------------------------------------------

--
-- 表的结构 `yuding`
--

CREATE TABLE `yuding` (
  `id` int(10) NOT NULL,
  `wupinid` int(10) NOT NULL,
  `studentid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `yuding`
--

INSERT INTO `yuding` (`id`, `wupinid`, `studentid`) VALUES
(4, 3, 2),
(6, 4, 1),
(8, 6, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fenlei`
--
ALTER TABLE `fenlei`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `liuyan`
--
ALTER TABLE `liuyan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wupin`
--
ALTER TABLE `wupin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `xunwu`
--
ALTER TABLE `xunwu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `xunwuliuyan`
--
ALTER TABLE `xunwuliuyan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `yuding`
--
ALTER TABLE `yuding`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `fenlei`
--
ALTER TABLE `fenlei`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- 使用表AUTO_INCREMENT `liuyan`
--
ALTER TABLE `liuyan`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- 使用表AUTO_INCREMENT `student`
--
ALTER TABLE `student`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `wupin`
--
ALTER TABLE `wupin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- 使用表AUTO_INCREMENT `xunwu`
--
ALTER TABLE `xunwu`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `xunwuliuyan`
--
ALTER TABLE `xunwuliuyan`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `yuding`
--
ALTER TABLE `yuding`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
