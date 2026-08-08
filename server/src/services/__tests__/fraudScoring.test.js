const calculateFraudScore = require("../fraudScoring");

describe("Fraud Scoring Engine", () => {
  // Helper to create a deadline a certain number of days from today
  const getFutureDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString();
  };

  // -----------------------------------------
  // TEST 1: Fully verified NGO
  // -----------------------------------------

  test("should give a low-risk score to a verified NGO with complete information", () => {
    const campaign = {
      description: "A".repeat(200),
      goalAmount: 500000,
      deadline: getFutureDate(30),
    };

    const ngo = {
      user: {
        isVerified: true,
      },
      website: "https://example.org",
      address: "Delhi, India",
    };

    const result = calculateFraudScore(campaign, ngo);

    expect(result.fraudScore).toBe(100);
    expect(result.riskLevel).toBe("Low");

    expect(result.breakdown).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          factor: "Verified NGO",
          impact: "+20",
          status: "positive",
        }),

        expect.objectContaining({
          factor: "Detailed Description",
          impact: "+10",
          status: "positive",
        }),

        expect.objectContaining({
          factor: "Official Website",
          impact: "+10",
          status: "positive",
        }),

        expect.objectContaining({
          factor: "Verified Address",
          impact: "+10",
          status: "positive",
        }),
      ])
    );
  });

  // -----------------------------------------
  // TEST 2: Unverified + suspicious campaign
  // -----------------------------------------

  test("should give high risk to an unverified NGO with missing information", () => {
    const campaign = {
      description: "Short campaign description",
      goalAmount: 2000000,
      deadline: getFutureDate(3),
    };

    const ngo = {
      user: {
        isVerified: false,
      },
      website: "",
      address: "Not Updated",
    };

    const result = calculateFraudScore(campaign, ngo);

    expect(result.fraudScore).toBe(0);
    expect(result.riskLevel).toBe("High");

    expect(result.breakdown).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          factor: "NGO Not Verified",
          impact: "-20",
          status: "negative",
        }),

        expect.objectContaining({
          factor: "Very Short Description",
          impact: "-15",
          status: "negative",
        }),

        expect.objectContaining({
          factor: "Website Missing",
          impact: "-10",
          status: "negative",
        }),

        expect.objectContaining({
          factor: "Address Missing",
          impact: "-10",
          status: "negative",
        }),

        expect.objectContaining({
          factor: "Very High Goal Amount",
          impact: "-10",
          status: "negative",
        }),

        expect.objectContaining({
          factor: "Very Short Deadline",
          impact: "-10",
          status: "negative",
        }),
      ])
    );
  });

  // -----------------------------------------
  // TEST 3: Medium-risk campaign
  // -----------------------------------------

  test("should correctly identify a medium-risk campaign", () => {
    const campaign = {
      description: "A".repeat(200),
      goalAmount: 500000,
      deadline: getFutureDate(3),
    };

    const ngo = {
      user: {
        isVerified: true,
      },
      website: "",
      address: "Not Updated",
    };

    const result = calculateFraudScore(campaign, ngo);

    expect(result.fraudScore).toBe(55);
    expect(result.riskLevel).toBe("Medium");
  });

  // -----------------------------------------
  // TEST 4: Score should never exceed 100
  // -----------------------------------------

  test("should cap fraud score at 100", () => {
    const campaign = {
      description: "A".repeat(500),
      goalAmount: 100000,
      deadline: getFutureDate(60),
    };

    const ngo = {
      user: {
        isVerified: true,
      },
      website: "https://example.org",
      address: "Delhi, India",
    };

    const result = calculateFraudScore(campaign, ngo);

    expect(result.fraudScore).toBeLessThanOrEqual(100);
    expect(result.fraudScore).toBe(100);
  });

  // -----------------------------------------
  // TEST 5: Score should never go below 0
  // -----------------------------------------

  test("should never allow fraud score below 0", () => {
    const campaign = {
      description: "Short",
      goalAmount: 5000000,
      deadline: getFutureDate(2),
    };

    const ngo = {
      user: {
        isVerified: false,
      },
      website: "",
      address: "Not Updated",
    };

    const result = calculateFraudScore(campaign, ngo);

    expect(result.fraudScore).toBeGreaterThanOrEqual(0);
    expect(result.fraudScore).toBe(0);
  });

  // -----------------------------------------
  // TEST 6: Explainable breakdown exists
  // -----------------------------------------

  test("should return an explainable breakdown for every scoring factor", () => {
    const campaign = {
      description: "A".repeat(200),
      goalAmount: 500000,
      deadline: getFutureDate(30),
    };

    const ngo = {
      user: {
        isVerified: true,
      },
      website: "https://example.org",
      address: "Delhi, India",
    };

    const result = calculateFraudScore(campaign, ngo);

    expect(result.breakdown).toHaveLength(6);

    result.breakdown.forEach((item) => {
      expect(item).toHaveProperty("factor");
      expect(item).toHaveProperty("impact");
      expect(item).toHaveProperty("status");

      expect(["positive", "negative"]).toContain(item.status);
    });
  });
});
