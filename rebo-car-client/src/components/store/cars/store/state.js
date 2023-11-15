const today = new Date();
const sevenDateLater = new Date(today.setDate(today.getDate() + 7));
export default {
  cars: ["1", "3"],
  page: 1,
  limit: 12,
  startDateTime: new Date(),
  endDateTime: sevenDateLater,
  typeOfCars: [
    "Mini",
    "Sedan",
    "Hatchback",
    "Convertible",
    "Jeep",
    "Limousine ",
    "Minivan",
    "Sports ",
  ],
  filters: {},
  autoMakers: [
    "BMW",
    "Ford",
    "Volkswagen AG",
    "Toyota",
    "Stellantis",
    "Mercedes-Benz",
    "Honda",
    "Hyundai",
  ],
  sortOptions: [
    "Giá thấp nhất",
    "Giá cao nhất",
    "Đánh giá tốt nhất",
    "Giảm giá nhiều nhất",
  ],
  location: {
    compound: {
      province: "Hồ Chí Minh",
    },
  },
  features: [
    "Bản đồ",
    "Camera cập lề",
    "Cảm biến lốp",
    "Cửa sổ trời",
    "Khe cắm USB",
    "Màn hình Android",
    "Bluetooth",
    "Camera hành trình",
    "Cảm biến va chạm",
    "Định vị GPS",
    "Lốp dự phòng",
    "ETC",
    "Camera 360",
    "Camera Lùi",
    "Cảnh báo tốc độ",
    "Ghế trẻ em",
    "Màn hình DVD",
    "Túi khí an toàn",
  ],
  fuels: ["Xăng", "Dầu Diesel", "Điện"],
  transmissions: ["Số tự động", "Số sàn"],
  yearRangeValue: [
    2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016,
    2017, 2018, 2019, 2020, 2021, 2022, 2023,
  ],
  filterState: {},
  carRegistration: {},
  specialPlaces: [
    {
      name: "Hồ Chí Minh",
      image:
        "https://n1-cstg.mioto.vn/1/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities_v2/HoChiMinh_v2.jpg",
    },
    {
      name: "Hà Nội",
      image:
        "https://n1-cstg.mioto.vn/1/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities_v2/HaNoi_v2.jpg",
    },
    {
      name: "Đà Nẵng",
      image:
        "https://n1-cstg.mioto.vn/1/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities_v2/DaNang_v2.jpg",
    },
    {
      name: "Bình Dương",
      image:
        "https://n1-cstg.mioto.vn/1/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities_v2/BinhDuong_v2.jpg",
    },
    {
      name: "Cần Thơ",
      image:
        "https://n1-cstg.mioto.vn/1/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities_v2/CanTho_v2.jpg",
    },
    {
      name: "Đà lạt",
      image:
        "https://n1-cstg.mioto.vn/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities_v2/DaLat_v2.jpg",
    },
    {
      name: "Nha Trang",
      image:
        "https://n1-cstg.mioto.vn/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities_v2/NhaTrang_v2.jpg",
    },
    {
      name: "Quy Nhơn",
      image:
        "https://n1-cstg.mioto.vn/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities_v2/QuyNhon_v2.jpg",
    },
    {
      name: "Phú Quốc",
      image:
        "https://n1-cstg.mioto.vn/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities_v2/PhuQuoc_v2.jpg",
    },
    {
      name: "Vũng Tàu",
      image:
        "https://n1-cstg.mioto.vn/cho_thue_xe_tu_lai_tphcm/hcm/p/m/cities_v2/VungTau_v2.jpg",
    },
  ],
};
