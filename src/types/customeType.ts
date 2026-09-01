export enum TBannerType {
  Default = "Default",
  SecondBanner = "SecondBanner",
  ThirdBanner = "ThirdBanner",
}

export enum TCategorySection {
  Default = "Default",
  SecondCategory = "SecondCategory",
  ThirdCategory = "ThirdCategory",
}

export enum TSectionHead {
  Default = "Default",
  SecondHead = "SecondHead",
  ThirdHead = "ThirdHead",
}

export enum TCardType {
  Default = "Default",
  SecondCard = "SecondCard",
  ThirdCard = "ThirdCard",
}

export enum TFlashBanner {
  Default = "Default",
  SecondBanner = "SecondBanner",
  ThirdBanner = "ThirdBanner",
}

export enum TBrandSection {
  Default = "Default",
  SecondBrand = "SecondBrand",
  ThirdBrand = "ThirdBrand",
}

export enum TBlogSection {
  Default = "Default",
  SecondBlog = "SecondBlog",
  ThirdBlog = "ThirdBlog",
}

export enum TFooterSection {
  Default = "Default",
  SecondFooter = "SecondFooter",
  ThirdFooter = "ThirdFooter",
}

export enum TShopPage {
  Default = "Default",
  SecondShop = "SecondShop",
  ThirdShop = "ThirdShop",
}

export enum TSearchSection {
  Default = "Default",
  SecondSearch = "SecondSearch",
}

export enum TLoginSection {
  Default = "Default",
  SecondLogin = "SecondLogin",
}

export type TCustome = {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;

  home?: {
    bannerType?: TBannerType;
    categorySection?: TCategorySection;
    sectionHead?: TSectionHead;
    cardType?: TCardType;
    flashBanner?: TFlashBanner;
    brandSection?: TBrandSection;
    blogSection?: TBlogSection;
    footerSection?: TFooterSection;
  };

  shop?: {
    shopPage?: TShopPage;
    cardType?: TCardType;
  };

  search?: {
    searchSection?: TSearchSection;
    cardType?: TCardType;
  };

  login?: {
    loginSection?: TLoginSection;
  };
};