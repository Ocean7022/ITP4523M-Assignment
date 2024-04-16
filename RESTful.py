from flask import Flask, jsonify

app = Flask("discountCalculator")


@app.route("/api/discountCalculator/<int:totalPrice>")
def process(totalPrice=None):
    if totalPrice >= 10000:
        response_data = {"DiscountRate": "13%", "NewOrderAmount": round(totalPrice * (1 - 0.13), 2)}
    elif totalPrice >= 5000:
        response_data = {"DiscountRate": "6%", "NewOrderAmount": round(totalPrice * (1 - 0.06), 2)}
    elif totalPrice >= 3000:
        response_data = {"DiscountRate": "3%", "NewOrderAmount": round(totalPrice * (1 - 0.03), 2)}
    else:
        response_data = {"DiscountRate": "0%", "NewOrderAmount": totalPrice}

    return jsonify(response_data)


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=80)
