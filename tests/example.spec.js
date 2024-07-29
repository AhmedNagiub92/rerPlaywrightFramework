// @ts-check
const { test, expect } = require('@playwright/test');

test('redirect to Nafath', async ({ page }) => {
  await page.goto('https://rer.sa/');
  //await page.pause();

  await page.locator('#header').getByRole('link', { name: 'عن السجل العقاري' }).click();
  await page.getByText('عن السجل العقاري').nth(3).click();
  await page.locator('.max-w-\\[1322px\\] > div:nth-child(3) > .flex').click();
  await page.getByText('الشركة الوطنية لخدمات التسجيل العيني للعقار (السجل العقاري) هي الشركة المسؤولة عن تنفيذ الأعمال التشغيلية للتسجيل العيني للعقار بشكلٍ حصري في المملكة العربية السعودية. يسعى السجل العقاري إلى تلبية كافة الاحتياجات العقارية وفقًا لأفضل الممارسات العالمية في القطاع وذلك عبر تأسيس بنية تحتية على مراحل زمنية متسلسلة، تهدف إلى إثراء القطاع العقاري بالمملكة وإعادة تشكيله عبر تقديم حلول ابتكارية مصممة لتسهيل تجربة ملاك العقار وتعزيز اتخاذ القرارات من قبل المستثمرين والشركاء في القطاع. تكمن قيمة السجل العقاري بتبني الابتكار في تقديم خدمات معززة بالتقنية، وتحقيق الشفافية والموثوقية عبر المخرجات النهائية التي تجعل حلم المستقبل العقاري واقعًا ملموسًا').click();
  await page.getByText('الرؤية', { exact: true }).click();
  await page.getByText('الرسالة').click();
  await page.getByText('أتقنتطوير البنى التحتية والإمكانات').click();
  await page.locator('div').filter({ hasText: /^سرعإنجاز أدوارنا الرئيسية$/ }).locator('img').click();
  await page.getByRole('link', { name: 'الخدمات', exact: true }).click();
  await page.getByRole('link', { name: 'قائمة الخدمات التسجيل العيني الأول تتيح هذه الخدمة للمستفيد تقديم طلب التسجيل ال' }).click();
  await page.getByRole('heading', { name: 'تسجيل الدخول / التسجيل مع نفاذ' }).click();
  await page.getByRole('main').locator('a').click();
  await page.locator('#pl1 > div').click();

await expect(page.getByRole('bb', { name: 'مرحبا بك عزيزي عميل/ منصة التسجيل العيني للعقار، في خدمة النفاذ الوطني الموحد' })).toBeVisible();
});

