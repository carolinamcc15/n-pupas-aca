import moment from 'moment';

export const fillWithZero = number => {
  return String(number).padStart(8, '0');
};

export const getProductDetails = (products, id) => {
  const product = products.filter(product => product.id == id);
  return product[0];
};

export const checkForProduct = (addedProducts, product, formData) => {
  const found = false;

  addedProducts.forEach(obj => {
    if (obj.mass) {
      if (obj.idProducto == product.id && obj.mass == formData.dough) {
        obj.amount += Number(formData.quantity);
        obj.total += Number(formData.quantity * obj.product.price);
        found = true;
      }
    } else {
      if (obj.idProducto == product.id) {
        obj.amount += Number(formData.quantity);
        obj.total += Number(formData.quantity * obj.product.price);
        found = true;
      }
    }
  });

  if (!found) {
    return [
      ...addedProducts,
      {
        idProducto: product.id,
        product: product,
        amount: Number(formData.quantity),
        mass: Number(formData.dough),
        total: Number(product.price * formData.quantity),
      },
    ];
  }

  return addedProducts;
};

export const toFormData = data => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value);
  }

  return formData;
};

export const calculateTodayExpenses = purchases => {
  let total = 0;
  purchases.forEach(purchase => {
    total += purchase.amount;
  });

  return total.toFixed(2);
};

const getDate = () => {
  const date = new Date();

  const dd = String(date.getDate()).padStart(2, '0');
  const MM = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();

  return `${yyyy}-${MM}-${dd}`;
};

export const createSaleObject = details => {
  const saleDetails = [];

  details.forEach(detail => {
    saleDetails.push({
      idProducto: detail.idProducto,
      amount: detail.amount,
      mass: detail.mass,
      total: detail.total,
    });
  });

  return {
    date: getDate(),
    details: saleDetails,
  };
};

export const calculateSaleTotal = details => {
  const total = 0;
  details.forEach(detail => {
    total += detail.total;
  });

  return Number(total);
};

export const calculateSoldProducts = details => {
  const total = 0;
  details.forEach(detail => {
    total += detail.amount;
  });

  return Number(total);
};

export const calculateAllSalesTotal = sales => {
  const total = 0;
  sales.forEach(sale => {
    total += calculateSaleTotal(sale.details);
  });

  return Number(total);
};

export const getCurrentDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
};

export const getPeriodOfTime = initialDate => {
  const b = moment(initialDate);
  const a = moment(getDate());

  const years = a.diff(b, 'year');
  b.add(years, 'years');

  const months = a.diff(b, 'months');
  b.add(months, 'months');

  const days = a.diff(b, 'days');

  return years + ' años, ' + months + ' meses, ' + days + ' días';
};

export const montlyDiscounts = {
  isss: salary => salary * 0.03,
  afp: salary => salary * 0.0725,
  rent: salary => {
    const discounted = salary - salary * 0.03 - salary * 0.0725;
    if (discounted > 472.0 && discounted <= 895.24) {
      return (discounted - 472) * 0.1 + 17.67;
    } else if (discounted > 895.24 && discounted <= 2038.1) {
      return (discounted - 895.24) * 0.2 + 60;
    } else if (discounted > 2038.01) {
      return (discounted - 2038.01) * 0.3 + 288.57;
    }

    return 0;
  },
};

export const biweeklyDiscounts = {
  rent: monthlySalary => {
    const salary = monthlySalary / 2;
    const discounted = salary - salary * 0.03 - salary * 0.0725;

    if (discounted > 236 && discounted <= 447.62) {
      return (discounted - 236) * 0.1 + 8.83;
    } else if (discounted > 447.62 && discounted <= 1019.05) {
      return (discounted - 447.62) * 0.2 + 30;
    } else if (discounted > 1019.05) {
      return (discounted - 1019.05) * 0.3 + 144.28;
    }

    return 0;
  },
  isss: salary => (salary / 2) * 0.03,
  afp: salary => (salary / 2) * 0.0725,
};
