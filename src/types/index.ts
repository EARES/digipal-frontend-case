export interface View {
  id: string;
  name: string;
  dataSource: string;
}

export interface Widget {
  id: string;
  name: string;
  views: View[];
}

export interface Dashboard {
  widgets: Widget[];
}
