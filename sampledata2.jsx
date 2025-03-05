const handleSubmit = async (e) => {
    e.preventDefault();

    if (!handleValidation()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "http://businessboosters.club/public/api/createUser",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        navigate("/thankyou");
        setFormData({
            name: "",
            gender: "",
            email: "",
            mobilenumber: "",
            whatsapp: "",
            profileimage: null,
            dateofbirth: "",
            spouse: "",
            company: "",
            anniversary: "",
            business: "",
            experience: "",
            website: "",
            address: "",
            area: "",
            products: "",
            landline: "",
            producttag: "",
          });
      } else {
        navigate("/failure");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      navigate("/failure");
    } finally {
      setLoading(false);
    }
  };