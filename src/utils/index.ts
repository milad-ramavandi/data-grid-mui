import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import type { GridLocaleText } from '@mui/x-data-grid';

export const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

// src/i18n/PersianLocaleForDataGrid.ts


// قالب‌بندی امن عددها به فارسی
export const formatNumber = (value: number | string) => {
  try {
    const num = Number(value);
    if (Number.isNaN(num)) return String(value);
    return new Intl.NumberFormat('fa-IR').format(num);
  } catch {
    return String(value);
  }
};

// تابعی که DataGrid برای نمایش "from–to of count" می‌خواد
const paginationDisplayedRows = ({
  from,
  to,
  count,
  estimated,
}: {
  from: number;
  to: number;
  count: number;
  estimated?: number;
}) => {
  // اگر تعداد کل ناشناخته باشد (count === -1) می‌توانیم متن دیگری نشان دهیم
  if (count === -1) {
    const estimatedLabel =
      estimated && estimated > to
        ? `تقریباً ${formatNumber(estimated)}`
        : `بیش از ${formatNumber(to)}`;
    return `${formatNumber(from)}–${formatNumber(to)} از ${estimatedLabel}`;
  }
  return `${formatNumber(from)}–${formatNumber(to)} از ${formatNumber(count)}`;
};

export const faLocaleText: Partial<GridLocaleText> = {
  // pagination
  paginationRowsPerPage: 'تعداد ردیف در هر صفحه',
  paginationDisplayedRows,
  paginationItemAriaLabel: (type) => {
    if (type === 'first') {
      return 'رفتن به اولین صفحه';
    }
    if (type === 'last') {
      return 'رفتن به آخرین صفحه';
    }
    if (type === 'next') {
      return 'رفتن به صفحه‌ی بعدی';
    }
    // if (type === 'previous') {
    return 'رفتن به صفحه‌ی قبلی';
  },


  // footer / selection
  footerRowSelected: (count: number) => `${formatNumber(count)} ردیف انتخاب‌شده`,
  footerTotalVisibleRows: (visibleCount: number, totalCount: number) =>
    `${formatNumber(visibleCount)}–${formatNumber(totalCount)} از ${formatNumber(totalCount)}`,

  // عمومی
  noRowsLabel: 'داده‌ای وجود ندارد',
  toolbarFilters: 'فیلترها',
  toolbarDensity: 'تراکم',
  toolbarExport: 'خروجی',
  // ... هر کلید دیگری که خواستی می‌تونی اینجا اضافه کنی
};

