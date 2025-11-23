import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { useNavigate, useLocation } from "react-router-dom";
import { CreditCard, Loader2 } from "lucide-react";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();


  const totalAmount = location.state?.total || 10;

  const [formData, setFormData] = useState({
    amount: totalAmount.toString(),
    tax_amount: "0",
    total_amount: totalAmount.toString(),
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: `${window.location.origin}/paymentsuccess`,
    failure_url: `${window.location.origin}/paymentfailure`,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q",
  });

  
  const generateSignature = (total_amount, transaction_uuid, product_code, secret) => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    return CryptoJS.enc.Base64.stringify(hash);
  };

  
  useEffect(() => {
    const { total_amount, transaction_uuid, product_code, secret } = formData;
    const signature = generateSignature(total_amount, transaction_uuid, product_code, secret);
    setFormData(prev => ({ ...prev, signature }));
  }, [formData.total_amount, formData.transaction_uuid]);

  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const data = params.get("data");

    if (data) {
      try {
        const decoded = atob(data);
        const result = JSON.parse(decoded);

        if (result.status === "COMPLETE" || result.success === true) {
          navigate("/paymentsuccess", { replace: true });
        } else {
          navigate("/paymentfailure", { replace: true });
        }
      } catch (err) {
        navigate("/paymentfailure", { replace: true });
      }
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="max-w-md w-full">
       
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CreditCard className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Secure Payment</h1>
          <p className="text-gray-600 mt-2">Complete your payment via eSewa</p>
        </div>

       
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          
          <div className="mb-10 text-center">
            <p className="text-sm text-gray-600 font-medium">Total Amount</p>
            <p className="text-5xl font-bold text-green-600 mt-2">
              Rs {formData.amount}
            </p>
          </div>

          
          <form
            action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
            method="POST"
            className="space-y-6"
          >
            <input type="hidden" name="amount" value={formData.amount} />
            <input type="hidden" name="tax_amount" value={formData.tax_amount} />
            <input type="hidden" name="total_amount" value={formData.total_amount} />
            <input type="hidden" name="transaction_uuid" value={formData.transaction_uuid} />
            <input type="hidden" name="product_code" value={formData.product_code} />
            <input type="hidden" name="product_service_charge" value={formData.product_service_charge} />
            <input type="hidden" name="product_delivery_charge" value={formData.product_delivery_charge} />
            <input type="hidden" name="success_url" value={formData.success_url} />
            <input type="hidden" name="failure_url" value={formData.failure_url} />
            <input type="hidden" name="signed_field_names" value={formData.signed_field_names} />
            <input type="hidden" name="signature" value={formData.signature} />

            <button
              type="submit"
              className="w-full py-5 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold text-xl transition-all transform active:scale-95 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
            >
              <img
                src="https://esewa.com.np/common/images/esewa-logo.png"
                alt="eSewa"
                className="h-9"
              />
              Pay with eSewa
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              You will be redirected to eSewa secure gateway
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

