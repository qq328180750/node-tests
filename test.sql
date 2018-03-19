/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50716
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50716
File Encoding         : 65001

Date: 2018-03-19 17:58:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `adminstore`
-- ----------------------------
DROP TABLE IF EXISTS `adminstore`;
CREATE TABLE `adminstore` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cname` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `itemNo` varchar(255) DEFAULT NULL,
  `imgArr` varchar(1000) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `commentNo` int(11) DEFAULT NULL,
  `score` varchar(2555) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `item` (`itemNo`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of adminstore
-- ----------------------------
INSERT INTO `adminstore` VALUES ('1', '猕猴桃', 'one', '50', '1001', '[\"https://imgqn4.fruitday.com/images/product_pic/4450/1/1-370x370-4450-FCAX148X.jpg\"]', '{\"title\":\"大猕猴桃\"}', '2001', '100');
INSERT INTO `adminstore` VALUES ('2', '苹果', 'one', '30', '1002', '00000', 'goods', '2002', '95');

-- ----------------------------
-- Table structure for `comment`
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `commentNo` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `commentTime` varchar(255) DEFAULT NULL,
  `commentScore` varchar(255) DEFAULT NULL,
  `itemNo` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`commentNo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('1', '1', 'admin', '10000', '20', '1001', '好不错');
INSERT INTO `comment` VALUES ('2', '2', 'admin', '10000', '50', '1002', '一般');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`,`username`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

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
