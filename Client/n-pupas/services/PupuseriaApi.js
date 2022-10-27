import { toFormData } from 'utils/utils';

export const BASE_URL = 'https://npupas.herokuapp.com';
let instance;

const getData = async (path, token) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = response.json();
  return data;
};

const postData = async (path, token, body) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: toFormData(body),
  });

  return response.ok;
};

const deleteData = async (path, token) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.ok;
};

const putData = async (path, token, body) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: toFormData(body),
  });

  return response.ok;
};

export const PupuseriaApi = class {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async registerAdmin(data) {
    const response = await fetch(`${BASE_URL}/auth/sign-up`, {
      method: 'POST',
      body: toFormData(data),
    });

    return response;
  }

  async login(credentials) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      body: toFormData(credentials),
    });

    const user = await response.json();
    return user;
  }

  getAllBranches(token) {
    const branches = getData('/pupuserias/branches/me', token);
    return branches;
  }

  getOneBranch(token, id) {
    const branch = getData(`/pupuserias/branches/${id}`, token);
    return branch;
  }

  createBranch(token, body) {
    return postData('/pupuserias/branches/', token, body);
  }

  deleteBranch(token, id) {
    return deleteData(`/pupuserias/branches/${id}`, token);
  }

  updateBranch(token, id, body) {
    return putData(`/pupuserias/branches/${id}`, token, body);
  }

  getTodayPurchases(token, branchID) {
    return getData(`/pupuserias/branches/${branchID}/purchases/today`, token);
  }

  getAllPurchases(token, branchID) {
    return getData(`/pupuserias/branches/${branchID}/purchases`, token);
  }

  getOnePurchase(token, branchID, purchaseID) {
    return getData(`/pupuserias/branches/${branchID}/purchases/${purchaseID}`, token);
  }

  createPurchase(token, branchID, body) {
    return postData(`/pupuserias/branches/${branchID}/purchases`, token, body);
  }

  deletePurchase(token, branchID, purchaseID) {
    return deleteData(`/pupuserias/branches/${branchID}/purchases/${purchaseID}`, token);
  }

  updatePurchase(token, branchID, purchaseID, body) {
    return putData(`/pupuserias/branches/${branchID}/purchases/${purchaseID}`, token, body);
  }

  createEmployee(token, branchID, body) {
    return postData(`/pupuserias/branches/${branchID}/employees`, token, body);
  }

  getAllEmployees(token, branchID) {
    return getData(`/pupuserias/branches/${branchID}/employees`, token);
  }

  deleteEmployee(token, branchID, id) {
    return deleteData(`/pupuserias/branches/${branchID}/employees/${id}`, token);
  }

  getOneEmployee(token, branchID, employeeID) {
    return getData(`/pupuserias/branches/${branchID}/employees/${employeeID}`, token);
  }

  updateEmployee(token, branchID, employeeID, body) {
    return putData(`/pupuserias/branches/${branchID}/employees/${employeeID}`, token, body);
  }

  getProductTypes(token) {
    return getData('/pupuserias/products/types', token);
  }

  getAllProducts(token) {
    return getData('/pupuserias/menu', token);
  }

  getOneProduct(token, productID) {
    return getData(`/pupuserias/menu/${productID}`, token);
  }

  createProduct(token, body) {
    return postData('/pupuserias/menu', token, body);
  }

  deleteProduct(token, productID) {
    return deleteData(`/pupuserias/menu/${productID}`, token);
  }

  updateProduct(token, productID, body) {
    return putData(`/pupuserias/menu/${productID}`, token, body);
  }

  getAllSales(token, branchID) {
    return getData(`/pupuserias/branches/${branchID}/sales`, token);
  }

  getTodaySales(token, branchID) {
    return getData(`/pupuserias/branches/${branchID}/sales/today`, token);
  }

  getOneSale(token, branchID, saleID) {
    return getData(`/pupuserias/branches/${branchID}/sales/${saleID}`, token);
  }

  deleteSale(token, branchID, saleID) {
    return deleteData(`/pupuserias/branches/${branchID}/sales/${saleID}`, token);
  }

  async createSale(token, branchID, body) {
    const response = await fetch(`${BASE_URL}/pupuserias/branches/${branchID}/sales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    return response.ok;
  }

  async updateSale(token, branchID, saleID, body) {
    const response = await fetch(`${BASE_URL}/pupuserias/branches/${branchID}/sales/${saleID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    return response.ok;
  }

  getEmployeeInfo(token) {
    return getData('/pupuserias/branches/employees/me', token);
  }

  getAdminInfo(token) {
    return getData('/pupuserias/admins/me', token);
  }

  getMyPupuseria(token) {
    return getData('/pupuserias/me', token);
  }

  async getReportPurchases(branchID, token, body) {
    return getData(
      `/pupuserias/branches/${branchID}/purchases/report?initialDate=${body.initialDate}&finalDate=${body.finalDate}`,
      token
    );
  }

  async getReportSales(branchID, token, body) {
    return getData(
      `/pupuserias/branches/${branchID}/sales/report?initialDate=${body.initialDate}&finalDate=${body.finalDate}`,
      token
    );
  }

  updateReport(branchID, token, body, reportId) {
    return putData(`/pupuserias/branches/${branchID}/employees/reports/${reportId}`, token, body);
  }

  getOneReport(branchID, token, reportId) {
    return getData(`/pupuserias/branches/${branchID}/employees/reports/${reportId}`, token);
  }

  createEmployeeReport(token, branchID, employeeID, body) {
    return postData(
      `/pupuserias/branches/${branchID}/employees/reports/${employeeID}`,
      token,
      body
    );
  }

  deleteReport(token, branchID, reportID) {
    return deleteData(`/pupuserias/branches/${branchID}/employees/reports/${reportID}`, token);
  }

  getEmployeeBranch(token) {
    return getData('/pupuserias/branches/employees/branch', token);
  }

};
