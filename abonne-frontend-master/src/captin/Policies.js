import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../style_ar.css';
import NavBar from '../components/NavBar';

function Policies() {
  return (
    <header className="header-pages block" id="home">
      <NavBar />

      <div className="header-content-pages">
        <div className="container">
          <div className="driver-content policies">
            <div className="content">
              <h2 className="light text-center">الشروط والسياسات الخاصة بتسجيل السائقين.</h2>
              <p>حتى تتمكن من الإنضمام إلى أبونيه لابد من توافر الشروط التالية:</p>
              <p>1 - يجب ألا يقل سن السائق عن 21 سنة.</p>
              <p>
                2 - يتطلب الإنضمام إلى أبونيه تسجيل بياناتك الشخصية ك الإسم و العنوان و رقم التليفون والعمر وبموافقتك على إدخال
                هذه البيانات ، لابد من كتابة معلومات دقيقة وحديثة حتى نتمكن من إضافتك على قواعد البيانات وبدأ العمل.
              </p>
              <p>
                3 - لا يجوز لأى شخص أو جهة إمتلاك حسابك فى أبونيه أو العمل عليه و إستغلاله وإلا يصبح حسابك موقوف بشكل نهائى من
                أبونيه.
              </p>
              <p>4 - الإلتزام بالقواعد و اللوائح المروية و فى حالة الإخلال بأى قاعده تؤثر على سلامه العميل يتم إيقاف حسابك.</p>
              <p>5 - فى حالة إلغائك للرحلة قبل موعدها مباشرة ودون إبداء أسباب يتم إيقاف الحساب.</p>
              <p>6 - الإعتذار عن القيام برحلة سبق أن وافقت عليها يكون قبل موعد الرحلة بحد أدنى ثلاث ساعات.</p>
              <p> 7 - لابد أن تكون سيارتك فى حالة جيدة و نظيفة و خالية من أى عطل أو خلل قد يؤثر على سلامة رحلتك.</p>

              <Link to={'/Registration_steps'} className="custom-btn main-color-text">
                أوافق
              </Link>
              <Link to={'/'} className="bold home">
                الرئيسية
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Policies;
