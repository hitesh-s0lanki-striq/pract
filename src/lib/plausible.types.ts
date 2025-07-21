export enum PlausibleProductType {
  ANALYTICS_REPORTING = "analytics_reporting",
  CATALOG = "catalog",
}

export enum PlausibleEventNames {
  TEST_EVENT_LISTENER = "test_event_listener",
  SHOPIFY_CONNECTED = "Shopify_connected",
  GMC_CONNECTED = "GMC_connected",
  FACEBOOK_CONNECTED = "Facebook_connected",
  XML_GENERATED = "XML_generated",
  XML_DELETED = "XML_deleted",
  SHOPIFY_SYNC_SETTINGS_CHANGED = "Shopify_sync_settings_changed",
  GMC_SYNC_SETTINGS = "gmc_sync_settings",
  FACEBOOK_SYNC_SETTINGS = "facebook_sync_settings",
  BULK_EDIT = "bulk_edit",
  PRODUCT_SET = "product_set",
}

export type PlausibleEventPayloadType = {
  name: PlausibleEventNames;
  url: string;
  props: {
    org_name?: string;
    account_id?: string;
    email_address?: string;
    identifier_on_platform?: string;
    gmc_id?: string;
    catalog_id?: string;
    catalog_name?: string;
    xml_name?: string;
    products_count?: number;
    no_of_product_selected?: number;
    product_type?: PlausibleProductType;
    key?: string;
    value?: string;
  };
  referrer?: string;
  revenue?: {
    currency: string;
    amount: number | string;
  };
  interactive?: boolean;
};
