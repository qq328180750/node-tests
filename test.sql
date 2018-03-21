/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50716
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50716
File Encoding         : 65001

Date: 2018-03-21 17:38:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `adminstore`
-- ----------------------------
DROP TABLE IF EXISTS `adminstore`;
CREATE TABLE `adminstore` (
  `itemNo` int(10) NOT NULL,
  `cname` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `imgArr` varchar(1000) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `commentNo` int(11) DEFAULT NULL,
  `score` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`itemNo`),
  UNIQUE KEY `item` (`itemNo`) USING HASH
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of adminstore
-- ----------------------------
INSERT INTO `adminstore` VALUES ('1001', '猕猴桃', 'one', '50', '[\"https://imgqn4.fruitday.com/images/product_pic/4450/1/1-370x370-4450-FCAX148X.jpg\"]', '{\"title\":\"大猕猴桃\"}', '2001', '100', null);
INSERT INTO `adminstore` VALUES ('1002', '苹果', 'one', '30', '00000', 'goods', '2002', '95', null);

-- ----------------------------
-- Table structure for `comment`
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `commentNo` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(20) NOT NULL,
  `itemNo` int(10) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `commentTime` varchar(255) DEFAULT NULL,
  `commentScore` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`commentNo`),
  KEY `用户名Id` (`userId`),
  KEY `商品id` (`itemNo`),
  CONSTRAINT `商品id` FOREIGN KEY (`itemNo`) REFERENCES `adminstore` (`itemNo`),
  CONSTRAINT `用户名Id` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('1', '1', '1001', 'admin', '10000', '20', '好不错');
INSERT INTO `comment` VALUES ('2', '2', '1002', 'admin', '10000', '50', '一般');
INSERT INTO `comment` VALUES ('11', '2', '1001', null, '1521618963390', '88', '不错');

-- ----------------------------
-- Table structure for `goodsorders`
-- ----------------------------
DROP TABLE IF EXISTS `goodsorders`;
CREATE TABLE `goodsorders` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `orderId` int(100) DEFAULT NULL,
  `itemNo` int(10) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `num` int(10) DEFAULT NULL,
  `allprice` double(100,0) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `连接主订单表` (`orderId`),
  KEY `连接商品类型` (`itemNo`),
  CONSTRAINT `连接主订单表` FOREIGN KEY (`orderId`) REFERENCES `mainorders` (`orderId`),
  CONSTRAINT `连接商品类型` FOREIGN KEY (`itemNo`) REFERENCES `adminstore` (`itemNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goodsorders
-- ----------------------------

-- ----------------------------
-- Table structure for `mainorders`
-- ----------------------------
DROP TABLE IF EXISTS `mainorders`;
CREATE TABLE `mainorders` (
  `orderId` int(100) NOT NULL AUTO_INCREMENT,
  `userId` int(20) DEFAULT NULL,
  `createTime` varchar(255) DEFAULT NULL,
  `updateTime` varchar(255) DEFAULT NULL,
  `allprice` double DEFAULT NULL,
  `status` int(11) DEFAULT NULL COMMENT '订单注释',
  `address` varchar(255) DEFAULT NULL,
  `addressName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`orderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of mainorders
-- ----------------------------

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '123456');
INSERT INTO `user` VALUES ('2', 'miao', '123456');

-- ----------------------------
-- Table structure for `websocketio`
-- ----------------------------
DROP TABLE IF EXISTS `websocketio`;
CREATE TABLE `websocketio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `content` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of websocketio
-- ----------------------------
INSERT INTO `websocketio` VALUES ('14', 'b', '[{\"from\":\"b\",\"toname\":\"a\",\"msg\":\"123\",\"time\":1521107353697}]');

-- ----------------------------
-- Table structure for `_mysql_session_store`
-- ----------------------------
DROP TABLE IF EXISTS `_mysql_session_store`;
CREATE TABLE `_mysql_session_store` (
  `id` varchar(255) NOT NULL,
  `expires` bigint(20) DEFAULT NULL,
  `data` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of _mysql_session_store
-- ----------------------------
