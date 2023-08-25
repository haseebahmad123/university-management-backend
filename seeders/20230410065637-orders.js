module.exports = {
    up: async (queryInterface) => {
      const obj = [
        {
          bundle_name: "children bundle",
          quantity: 3,
          amount: "456",
        },
        {
          bundle_name: "adult bundle",
          quantity: 3,
          amount: "458",
        },
      ];
      const ordersData = [
        {
          firstname: "zain",
          lastname: "asim",
          email: "zain@gmail.com",
          phone_number: "03-0057687",
          address: "vudq asbuye hxuyv",
          destination_country: "pakistn",
          total_amount: 987654,
          order_detail: JSON.stringify(obj),
          order_note: "zaiubd zjakduwb aucvuec",
          payment_by_flutterwave: true,
          payment_status: "pending",
          payment_receipt: "",
          order_ref: `TRX-${Date.now()}`,
        },
      ];
  
      return queryInterface.bulkInsert("orders", ordersData, {});
    },
  
    down: (queryInterface) => queryInterface.bulkDelete("orders", null, {}),
  };