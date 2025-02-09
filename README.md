# 数据结构

## SQL

```sql
CREATE TABLE `daily_expenses` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '消费记录ID',
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '关联用户ID',
  `amount` decimal(10,2) NOT NULL COMMENT '消费金额',
  `category` varchar(50) NOT NULL COMMENT '消费类别，例如：餐饮、交通、购物',
  `description` varchar(255) DEFAULT NULL COMMENT '消费详情描述',
  `expense_date` date NOT NULL COMMENT '消费日期',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录创建时间',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fk_user_expenses` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='日常消费记录表，记录用户的消费数据';
```

## id

唯一标识每一条消费记录，使用 char(36)，可存储 UUID。

## user_id

用于关联 user 表中的用户，建立外键关联。

## amount

消费金额，使用 decimal(10,2)，精确到小数点后两位，支持最大值为 99999999.99。

## category

消费类别，如餐饮、交通、购物等，用于对消费进行分类。

## description

可选字段，用于描述消费详情，例如 "购买书籍"。

## expense_date

消费的日期，方便按日期统计或查询。

## created_at

记录创建时间，默认值为当前时间戳。

## 外键约束

fk_user_expenses：user_id 外键关联 user 表的 id 字段，支持级联删除（ON DELETE CASCADE），即删除用户时会自动删除该用户的消费记录。
