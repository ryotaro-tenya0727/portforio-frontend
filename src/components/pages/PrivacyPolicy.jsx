import { MenuButton } from './../atoms/atoms';
import privacypolicy from './../../css/pages/privacypolicy.module.css';

const PrivacyPolicy = () => {
  return (
    <>
      <div className={privacypolicy.wrapper}>
        <MenuButton />
        <p className={privacypolicy.title}>プライバシーポリシー</p>
        <h3>お客様から取得する情報</h3>
        <p className={privacypolicy.text}>
          当サービスは、お客様から以下の情報を取得します。
          <ul>
            <li> 氏名(ニックネームやペンネームも含む)</li>
            <li> メールアドレス</li>
            <li>写真</li>
            <li>
              外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報
            </li>
          </ul>
        </p>
        <h3>お客様の情報を利用する目的</h3>
        <p className={privacypolicy.text}>
          当サービスは、お客様から取得した情報を、以下の目的のために利用します。
          <ul>
            <li>当サービスに関する登録の受付、お客様の本人確認、認証のため</li>
            <li>お客様の当サービスの利用履歴を管理するため</li>
            <li>
              当サービスにおけるお客様の行動履歴を分析し、当サービスの維持改善に役立てるため
            </li>
            <li>当サービスに関するご案内をするため</li>
            <li>お客様からのお問い合わせに対応するため</li>
            <li>当サービスの規約や法令に違反する行為に対応するため</li>
            <li>当サービスの変更、提供中止、終了をご連絡するため</li>
            <li>当サービス規約の変更等を通知するため</li>
            <li>以上の他、当サービスの提供、維持、保護及び改善のため</li>
          </ul>
        </p>
        <h3>安全管理のために講じた措置</h3>
        <p className={privacypolicy.text}>
          当サービスが、お客様から取得した情報に関して安全管理のために講じた措置につきましては、末尾記載のお問い合わせ先にご連絡をいただきましたら、法令の定めに従い個別にご回答させていただきます。
        </p>
        <h3>第三者提供</h3>
        <p className={privacypolicy.text}>
          当サービスは、お客様から取得する情報のうち、個人データ（個人情報保護法第２条第６項）に該当するものついては、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。
          但し、次の場合は除きます。
        </p>
        <ul>
          <li>個人データの取扱いを外部に委託する場合</li>
          <li>当サービスが買収された場合</li>
          <li>
            事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）
          </li>
          <li>その他、法律によって合法的に第三者提供が許されている場合</li>
        </ul>
        <h3>アクセス解析ツール</h3>
        <p className={privacypolicy.text}>
          当サービスは、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについて、詳しくは以下からご確認ください。
          https://marketingplatform.google.com/about/analytics/terms/jp/
        </p>
        <h3>お問い合わせ</h3>
        <p className={privacypolicy.text}>
          お客様の情報の開示、情報の訂正、利用停止、削除をご希望の場合は、以下のメールアドレス,SNSにご連絡ください。
          <p>
            <strong>e-mail: </strong>
            ryotaro123110@gmail.com
          </p>
          <p>
            <strong>twitter: </strong>
            https://twitter.com/naka_ryo_z
          </p>
        </p>
        <h3>運営者の氏名</h3>
        中山遼太郎
      </div>
    </>
  );
};

export default PrivacyPolicy;
