
<img src="https://img.shields.io/badge/react-v18.0.0-green">  [![Maintainability](https://api.codeclimate.com/v1/badges/6e95e4571f59ead7e3ea/maintainability)](https://codeclimate.com/github/ryotaro-tenya0727/portforio-frontend/maintainability)


こちらは「推し♡だいありー」のフロントエンドのリポジトリになります。

バックエンドのリポジトリは[こちら](https://github.com/ryotaro-tenya0727/portfolio-backend)

サービスへのリンク: [推し♡だいありー](https://www.oshi-diary.com/)

# 推し♡だいありー

## サービス概要

アイドルファンの人が推しと撮ったチェキや写メ、その日あった出来事、日付、会場を日記として記録していくサービス

メンバー一人一人との思い出をいつでも簡単に振り返ることができる。

## 実装済みの機能

### 一般ユーザー

**認証**

- 新規登録、ログイン機能
- ソーシャルログイン機能

**メイン機能**

- 推しメンを登録する機能
- 推しメンとの思い出を日記にして登録する機能
- 推しメンの名前で変化する動的OGP画像を作成してツイートできる機能
- 撮ったチェキの枚数を記録していく機能
- 出会って何日経ったか記録していく機能

### 管理ユーザー
- 一般ユーザーを管理する機能

## 実装予定機能

### 一般ユーザー

**メイン機能**

- チェキを誰と何枚撮ったか円グラフに表示されていく機能
- 日記を記録した日にちがカレンダーに表示される機能

- 気に入ったユーザーをフォローする機能
- フォローしたユーザーの日記がタイムラインに流れる機能
- 日記にコメントがあった時に通知がくる機能
- 他のユーザーの日記にコメントする機能


### 管理ユーザー
- ユーザーの日記を管理する機能
- 運営からメッセージを送れる機能

## 使用技術

### 🔻認証
- Auth0

### 🔻バックエンド
- Ruby(2.7.4)
- Ruby&nbsp;on&nbsp;Rails(6.1.5)*APIモード

### 🔻Gem
- Faraday
- JWT
- Pundit
- Jsonapi-Serializer
- Aws-sdk-s3

### 🔻フロントエンド
- Javascript
- React(18.0.0)
- React&nbsp;Query
- React&nbsp;Router
- ReactHookForm
- Axios
- MUI
- ModuleCSS

### 🔻インフラ
- Nginx
- Unicorn
- Docker
- AWS(ECS&nbsp;Fargate&nbsp;,&nbsp;ECR&nbsp;,&nbsp;RDS&nbsp;,&nbsp;ALB&nbsp;,&nbsp;Route53&nbsp;,&nbsp;Lambda@Edge&nbsp;,&nbsp;CloudFront&nbsp;,&nbsp;S3)
- CircleCI
- Mysql



## インフラ構成図
![infra-figure drawio (3)](https://user-images.githubusercontent.com/71915489/176634308-bd77985e-34c3-4d72-9f6e-61d2a929dfc2.png)



## ER図


![ER_figure 2 drawio (1)](https://user-images.githubusercontent.com/71915489/190622051-bd535d0e-0ee8-4577-b27e-e7900ebe27a7.png)


## 実際に作成した推しメンとの日記

以下のように日記のような形で推しメンとの思い出をメンバーごとに記録していく。　
<div align="center">
<img width="428" alt="スクリーンショット 2022-06-29 19 25 11" src="https://user-images.githubusercontent.com/71915489/176414909-346fb442-41c7-4ee1-bd14-2e3d3f32dbfc.png">
</div>







