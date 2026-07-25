

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TSubmenu = {
  href: string;
  label: string;
  active: boolean;
  icon?:any
};

export type TMenu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: TSubmenu[];
};

export type TGroup = {
  groupLabel: string;
  menus: TMenu[];
};

export type TCategory = {
  _id: string;
  categoryName: string;
  title: string;
  slug: string;
  image: string;
};

export type TSubCategory = {
  _id: string;
  category: {
    _id: string;
    categoryName: string;
  };
  subcategoryName: string;
  image: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TBrand = {
  _id: string;
  title: string;
  image: string;
  slug: string;
};

export type TInventory = {
  _id: string;
  id: string;
  color?: string;
  colorName?: string;
  size?: string;
  quantity: number;
  soldQuantity?: string;
  holdQuantity?: string;
};

export type TSpecification = {
  key: string;
  value: string;
};

export type TProduct = {
  _id: string;
  title: string;
  mrpPrice: number;
  discount?: number;
  discountType?: string;
  soldQuantity?: number;
  description: string;
  category: TCategory;
  subCategory?: TSubCategory;
  brand?: TBrand;
  thumbnailImage: string;
  backviewImage?: string | null | undefined;
  images?: string[];
  freeShipping?: boolean;
  inventoryType?: string;
  inventories?: TInventory[];
  stock_status?: string;
  status?: string;
  label?: string;
  tags?: string[];
  specifications?: TSpecification[];
  averageRating?: number;
  totalReviews?: number;
  metaTitle?: string;
  metaDescription?: string;
  quantity?: number;
  slug?: string;
  sku?: string;
  barcode?: string;
  price?: number;
  availableQuantity?: number;
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TCoupon = {
  _id: string;
  code: string;
  discount: number;
  discountType: string;
  useLimit: number;
  used: number;
  perUserLimit: number;
  startDate: string;
  expireDate: string;
  couponType: string;
  categoryID?: TCategory;
  brandID?: TBrand;
  subCategoryID?: TSubCategory;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TCampaign = {
  _id: string;
  title: string;
  image?: string;
  couponId: TCoupon;
};

export type TAuth = {
  provider: string;
  providerId: string;
};

export type TUser = {
  _id: string;
  name: string;
  email: string;
  address: string;
  isActive: string;
  password: string;
  phone: string;
  image: string;
  picture: string;
  auths: TAuth[];
  role: string;
  createdAt: string;
};

export type TBanner = {
  _id: string;
  title?: string;
  category?: TCategory;
  image: string;
  description?: string;
  link?: string;
  type: string;
};

export type TPolicy = {
  _id: string;
  title: string;
  description: string;
  type: string;
};
export type TAbout = {
  _id: string;
  description: string;
  type: string;
};
export type TContact = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};
export type TSocial = {
  _id: string;
  link: string;
  type: string;
  socialType: string;
};

export type TLogo = {
  _id: string;
  headerLogo: string;
  footerLogo: string;
  description: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  type: string;
};
export type TReview = {
  [x: string]: any;
  _id: string;
  userID: TUser;
  productID: TProduct;
  rating: number;
  comment: string;
  type: string;
};

export type TOrderProduct = {
  productRef: TProduct;
  quantity: number;
  price: number;
  color?: string;
  size?: string;
  _id?: string;
};

export type TPaymentInfo = {
  method: string;
  transactionId?: string;
  paymentStatus: string;
  paidAt?: string;
};

export type TDeliveryInfo = {
  courierName?: string;
  trackingNumber?: string;
  estimatedDeliveryDate?: string;
  deliveredAt?: string;
};

export type TShippingAddress = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  house?: string;
  road?: string;
  thana?: string;
  altPhone?: string;
  city?: string;
};

export type TOrder = {
  _id: string;
  orderId: string;
  userRef?: TUser;
  isGuestOrder: boolean;
  products: TOrderProduct[];
  subTotalPrice: number;
  discountAmount?: number;
  shippingCost: number;
  totalPrice: number;
  couponRef?: TCoupon;
  shippingAddress: TShippingAddress;
  payment: TPaymentInfo;
  paymentMethod?: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  address: string;
  house?: string;
  road?: string;
  thana?: string;
  postalCode?: string;
  status: string;
  deliveryInfo?: TDeliveryInfo;
  note?: string;
  paymentStatus?: string;
  createdAt?: string;
  updatedAt?: string;
  discount?: string;
};

export type TOrderByCategory = {
  categoryName: string;
  totalOrders: number;
  categoryId: string;
};

export type TOrderPerProduct = {
  orderCount: number;
  productId: string;
  title: string;
  slug: string;
  thumbnailImage: string;
  price: number;
};

export type TOrderChart = {
  _id: string;
  orders: number;
  revenue: number;
};

export type TOrderStatus = {
  _id: string;
  orders: number;
};

export type TCityStats = {
  [x: string]: any;
  totalOrders: number;
  totalRevenue: number;
  totalProductsSold: number;
  city: string;
  averageOrderValue: number;
};

export type TReasonsStats = {
  reason: string;
  count: number;
  percentage: number;
};

export type TReturnStats = {
  totalReturns: number;
  reasons: TReasonsStats[];
};

export type TOrderStats = {
  totalOrder: number;
  totalOrderByCategory: TOrderByCategory[];
  orderPerProduct: TOrderPerProduct[];
  orderToday: number;
  orderLast3Days: number;
  orderLast7Days: number;
  orderLast30Days: number;
  orderChart: TOrderChart[];
  orderStatus: TOrderStatus[];
  cityStats: TCityStats[];
  returnStats: TReturnStats[];
};

export type TUsersByRole = {
  _id: string;
  count: number;
};

export type TUserStats = {
  totalUsers: number;
  totalActiveUsers: number;
  totalInActiveUsers: number;
  totalBlockedUsers: number;
  newUsersInLast7Days: number;
  newUsersInLast30Days: number;
  usersByRole: TUsersByRole[];
};

export type TLowStockAlert = {
  [x: string]: any;
  length: any;
  _id: string;
  title: string;
  soldQuantity: number;
  quantity: number;
  availableQuantity: number;
  alertType: "LOW" | "CRITICAL";
};
export type TTotalHighestOrderProduct = {
  
  totalSold: number;
  totalOrders: number;
  revenue: number;
  productId: string;
  name: string;
  slug: string;
};
export type TInventoryValueStats = {
  
  totalProducts: number;
  totalStock: number;
  totalMRPValue: number;
  totalSellingValue: number;
  totalDiscountValue: number;
};

export type TProductStats = {
  lowStockAlerts: TLowStockAlert[];
  totalHighestOrderProduct:TTotalHighestOrderProduct[]
  inventoryValueStats:TInventoryValueStats[]
};


export type THomeControll = {
  _id: string;
  title: string;
  landing: string;
  order: string;
  enabled: string;
 
};

