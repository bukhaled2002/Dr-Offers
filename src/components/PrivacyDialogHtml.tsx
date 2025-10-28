import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function PrivacyDialogHtml() {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="text-blue-600 hover:underline cursor-pointer">
          {t("privacy_policy")}
        </span>
      </DialogTrigger>

      <DialogContent className="max-w-3xl w-full ">
        <DialogHeader dir="rtl" className="text-right">
          <DialogTitle className="text-right text-xl font-bold text-primary">
            سياسة الخصوصية – D.offers
          </DialogTitle>
          <DialogDescription className="text-right">
            آخر تحديث: 26 مايو 2025
          </DialogDescription>
        </DialogHeader>

        <div
          dir="rtl"
          className="space-y-6 text-right max-h-[70vh] overflow-y-auto"
        >
          <p className="text-sm text-gray-700">
            توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية المعلومات الشخصية
            الخاصة بك عند استخدامك لموقعنا الإلكتروني أو خدماتنا.
          </p>

          <p className="text-sm text-gray-700">
            بدخولك أو استخدامك موقع D.offers، فإنك توافق على البنود الموضحة
            أدناه المتعلقة بجمع واستخدام البيانات الشخصية، وذلك بما يتماشى مع
            الأنظمة المطبقة في المملكة العربية السعودية، وعلى رأسها نظام حماية
            البيانات الشخصية الصادر عن هيئة البيانات والذكاء الاصطناعي (سادا).
          </p>

          <section>
            <h3 className="font-semibold text-base mb-2">١. تعريفات</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <strong>الشركة:</strong> تشير إلى "D.offers" ومقرها المملكة
                العربية السعودية ويُشار إليها بـ "نحن" أو "لنا" أو "خاصتنا".
              </li>
              <li>
                <strong>الخدمة:</strong> تشير إلى الموقع الإلكتروني وخدماته
                المتاحة عبر الإنترنت.
              </li>
              <li>
                <strong>المستخدم:</strong> هو الفرد أو الجهة التي تقوم باستخدام
                الموقع أو الخدمات.
              </li>
              <li>
                <strong>البيانات الشخصية:</strong> تشير إلى أي معلومات تتعلق
                بشخص يمكن التعرف عليه بشكل مباشر أو غير مباشر.
              </li>
              <li>
                <strong>ملفات تعريف الارتباط (Cookies):</strong> ملفات نصية
                صغيرة تُخزن على جهاز المستخدم لتسهيل تجربة التصفح وتحسين الخدمة.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-base mb-2">
              ٢. المعلومات التي نقوم بجمعها
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              قد نقوم بجمع الأنواع التالية من البيانات:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>الاسم الكامل</li>
              <li>عنوان البريد الإلكتروني</li>
              <li>رقم الهاتف</li>
              <li>المدينة/المنطقة</li>
              <li>
                بيانات الاستخدام (مثل الصفحات التي تم تصفحها ووقت الزيارة)
              </li>
              <li>بيانات الجهاز (نوع المتصفح، نظام التشغيل، وعنوان الـ IP)</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-base mb-2">
              ٣. كيفية استخدامنا لبياناتك
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              نقوم باستخدام البيانات الشخصية للأغراض التالية:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>تقديم وتحسين خدمات الموقع</li>
              <li>التواصل معك بخصوص العروض أو الخدمات</li>
              <li>إدارة حسابك إن وُجد</li>
              <li>تحليل استخدام الموقع وتحسين الأداء</li>
              <li>الالتزام بالمتطلبات القانونية والتنظيمية في المملكة</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-base mb-2">
              ٤. ملفات تعريف الارتباط (Cookies)
            </h3>
            <p className="text-sm text-gray-700">
              نستخدم الكوكيز لتحسين تجربة المستخدم. يمكنك اختيار تعطيل الكوكيز
              من إعدادات المتصفح، لكن قد يؤثر ذلك على بعض وظائف الموقع.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-base mb-2">٥. مشاركة البيانات</h3>
            <p className="text-sm text-gray-700 mb-2">
              قد نشارك بياناتك الشخصية مع:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                مزودي الخدمات المرتبطين بنا (مثل شركات التحليل أو الدعم الفني)
              </li>
              <li>شركاء الأعمال لأغراض تسويقية بعد موافقتك</li>
              <li>الجهات الحكومية أو التنظيمية إذا طُلب منا ذلك قانونياً</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-base mb-2">٦. أمان البيانات</h3>
            <p className="text-sm text-gray-700">
              نلتزم بتطبيق أفضل المعايير الأمنية التقنية والتنظيمية لحماية
              بياناتك، لكن نذكرك بأنه لا توجد وسيلة نقل عبر الإنترنت آمنة بنسبة
              100%.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-base mb-2">
              ٧. حقوقك كمستخدم في المملكة
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              بموجب الأنظمة السعودية، يحق لك:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>طلب الاطلاع على بياناتك الشخصية</li>
              <li>طلب تصحيح أو تحديث بياناتك</li>
              <li>
                طلب حذف بياناتك (ما لم يكن هناك التزام قانوني بالاحتفاظ بها)
              </li>
            </ul>
            <p className="text-sm text-gray-700 mt-2">
              يمكنك تقديم الطلبات من خلال التواصل معنا عبر الوسائل الموضحة
              أدناه.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-base mb-2">٨. بيانات الأطفال</h3>
            <p className="text-sm text-gray-700">
              لا نوفر خدماتنا للأطفال دون سن 13 عاماً، ولا نقوم بجمع بيانات
              شخصية منهم عن قصد.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-base mb-2">
              ٩. روابط المواقع الخارجية
            </h3>
            <p className="text-sm text-gray-700">
              قد يحتوي الموقع على روابط لمواقع أخرى. نحن لسنا مسؤولين عن سياسات
              الخصوصية أو محتوى هذه المواقع.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-base mb-2">
              ١٠. تعديلات سياسة الخصوصية
            </h3>
            <p className="text-sm text-gray-700">
              قد نقوم بتحديث هذه السياسة من وقت لآخر. سيتم نشر التعديلات على هذه
              الصفحة مع تحديث تاريخ "آخر تعديل" في الأعلى.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-base mb-2">١١. التواصل معنا</h3>
            <p className="text-sm text-gray-700 mb-2">
              للاستفسارات أو الطلبات المتعلقة بسياسة الخصوصية أو بياناتك
              الشخصية، يُرجى التواصل معنا عبر:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>
                <strong>البريد الإلكتروني:</strong> abofahd58m@gmail.com
              </li>
              <li>
                <strong>رقم الهاتف: </strong>
                <span dir="ltr"> +966 55 446 9058</span>
              </li>
            </ul>
          </section>
        </div>

        <div className="flex mt-4">
          <DialogClose asChild>
            <Button>إغلاق</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
