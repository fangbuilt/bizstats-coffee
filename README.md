# Coffee Business Analytics Documentation

## Quick Start Guide

### What This Data Means for Your Coffee Shop

This platform analyzes 890 specialty coffee samples from 2010-2018, focusing on the quality characteristics that matter most for your business decisions. The data covers 97.3% Arabica and 2.7% Robusta beans, with comprehensive scoring across 8 key attributes.

**Quality Score Scale**: 70-90 points (industry standard)

- 70-79: Good quality, suitable for blends
- 80-84: Very good, premium positioning possible
- 85+: Exceptional, signature menu material

### Key Terms for Entrepreneurs

**Sensory Scores**:

- **Aroma**: First impression, crucial for customer attraction
- **Flavor**: Core taste experience
- **Body**: Mouthfeel and texture
- **Acidity**: Brightness, not sourness
- **Balance**: How well all elements work together
- **Aftertaste**: Lingering taste after swallowing
- **Uniformity**: Consistency across batches (business critical)
- **Sweetness**: Natural sweetness without added sugar

---

## Chart Interpretations

### Country Performance Rankings

**What You See**: Horizontal bar chart showing total quality scores by country

**Business Insight**: This reveals your most reliable sourcing options. Countries with higher scores consistently deliver better quality coffee.

**Key Findings**:

- **Ethiopia (85.355)**: Premium flagship blend material
- **Colombia**: Quality + market proven (best balance for new shops)
- **Tanzania**: Consistency champion (uniform experience)
- **Brazil**: Natural sweetness leader (customer-friendly)
- **Kenya**: Aftertaste specialist (perfect for espresso)

**Action Item**: Choose 2-3 primary countries based on your positioning strategy rather than chasing the highest score.

### Standard Deviation Analysis

**What You See**: Interactive cards showing variation in each characteristic

**Business Insight**: Lower variation = more predictable quality. Higher variation = opportunity for differentiation.

**Strategic Implications**:

- **Low Variation** (Aroma 0.31, Flavor 0.35, Body 0.31): Reliable benchmarks
- **Higher Variation** (Uniformity 0.48, Sweetness 0.45): Differentiation opportunities
- **Very Low** (Moisture 0.04): Quality control is consistent across suppliers

**Action Item**: Focus differentiation efforts on uniformity or sweetness where you can actually stand out.

### Supply Volume Analysis

**What You See**: Bar chart showing total bags sold by country

**Business Insight**: Market reality vs. quality scores. High volume = proven customer demand and mature supply chains.

**Key Discovery**:

- **Guatemala**: Highest volume despite moderate quality scores
- **Colombia**: Perfect balance (high quality + high volume)
- **Ethiopia**: High quality but smaller market presence

**Action Item**: Consider market-tested origins for lower-risk sourcing, especially when starting out.

---

## Matrices Explained

### Correlation Matrix

**What You See**: Heat map showing relationships between characteristics

**Business Insight**: Some qualities are linked - improve one, you likely improve others. Some are independent - you need to choose.

**Critical Findings**:

- **Flavor ↔ Aftertaste (0.87)**: Strongly linked - focus on one improves both
- **Flavor ↔ Acidity (0.76)**: Bright, flavorful coffees go together
- **Aroma ↔ Flavor (0.74)**: Good smell usually means good taste
- **Uniformity & Sweetness**: Independent - you must choose your priority

**Strategic Choice**: You can't easily have both perfect uniformity AND maximum sweetness. Pick your competitive advantage.

### Altitude Correlation

**What You See**: Scatter plot testing altitude vs. quality

**Business Insight**: Common myth busted - altitude alone doesn't guarantee quality (only 8% correlation).

**Action Item**: Don't pay premium for "high altitude" marketing. Focus on actual quality scores instead.

---

## Sourcing Playbook

### New Coffee Shop Strategy Framework

#### Phase 1: Choose Your Positioning

**Consistency-First Approach**:

- Primary: Tanzania (uniformity leader)
- Secondary: Colombia (balanced reliability)
- Message: "Same perfect cup every time"

**Sweetness-First Approach**:

- Primary: Brazil (sweetness leader)
- Secondary: Ethiopia (premium positioning)
- Message: "Naturally sweet, less sugar needed"

**Premium Quality Approach**:

- Primary: Ethiopia (quality leader)
- Secondary: Kenya (aftertaste specialist)
- Message: "Exceptional coffee experience"

#### Phase 2: Risk Management

1. **Multi-Country Sourcing**: Never rely on single origin
2. **Sample Size Rule**: Require multiple batches before committing (avoid Papua New Guinea trap)
3. **Quality Checks**: Monitor moisture content as freshness indicator
4. **Seasonal Planning**: Use exceptional single-origin coffees for limited offerings

#### Phase 3: Menu Development

**Core Blend Strategy**:

- Use high-scoring, consistent origins (Ethiopia, Colombia)
- Target 82+ total score for differentiation
- Ensure supplier can provide regular quantities

**Signature Drinks**:

- Espresso: Kenya (aftertaste specialist)
- Sweet Drinks: Brazil (natural sweetness)
- Consistent Experience: Tanzania (uniformity)

**Seasonal Specials**:

- Single exceptional batches (like Papua New Guinea's 85.75)
- Market as limited availability
- Higher margin opportunities

---

## Case Studies

### The Papua New Guinea Discovery

**The Problem**: Initial analysis showed Papua New Guinea as the quality leader (85.75 score).

**The Reality**: This exceptional score came from a single batch in 2012 - not a reliable sourcing pattern.

**The Solution**: Implemented minimum sample size filter (n≥3) to ensure consistency.

**Business Lesson**: One amazing batch doesn't make a reliable supplier. Consistency beats perfection for sustainable business.

**Implementation**: Always request multiple samples across different time periods before committing to new suppliers.

### The Colombia Balance

**The Discovery**: Colombia ranks #2 in quality (with n≥10 filter) AND #2 in total market sales.

**Business Insight**: Perfect balance of proven quality and market acceptance.

**Why This Matters**: Lower risk for new entrepreneurs - you get both exceptional coffee and customer familiarity.

**Implementation Strategy**: Use Colombia as your "safe bet" primary supplier while experimenting with other origins for differentiation.

---

## Statistical Methods (For Analytics Inquiries)

### Sample Size Validation

**Method**: Progressive filtering from n≥1 to n≥100 to test ranking stability.

**Key Finding**: Ethiopia's score (85.355) remained identical across n≥3, n≥5, n≥10, and n≥20, validating our chosen threshold.

**Statistical Rationale**: n≥3 provides sufficient data points for reliable country-level assessment while maintaining broad geographic coverage (24 countries).

### Correlation Analysis Methodology

**Approach**: Pearson correlation coefficient calculation across all sensory attributes.

**Significance Testing**: Correlations above 0.7 considered strong, 0.5-0.7 moderate, below 0.5 weak.

**Business Application**: Strong correlations (flavor-aftertaste 0.87) indicate integrated quality systems, while weak correlations (uniformity-sweetness) suggest independent optimization opportunities.

### Data Processing Pipeline

**Tools**: Orange Data Mining (outlier detection) + TypeScript (processing) + React (visualization)

**Outlier Removal**: Reduced dataset from 988 to 890 entries using statistical outlier detection.

**Normalization**: JSON normalization for consistent cross-sample comparison.

**Aggregation**: TypeScript array methods (.filter, .reduce, .map, .sort) with simple-statistics library for advanced calculations.

---

## Implementation Checklist

### For New Coffee Shops

- [ ] Define quality vs. consistency vs. sweetness priority
- [ ] Select 2-3 primary sourcing countries based on strategy
- [ ] Establish minimum sample size requirements with suppliers
- [ ] Create quality control checklist using moisture content
- [ ] Plan seasonal menu strategy for exceptional single batches
- [ ] Set up supplier diversification plan

### For Existing Shops

- [ ] Audit current suppliers against quality benchmarks
- [ ] Identify gaps in your quality positioning
- [ ] Test new origins using statistical validity approach
- [ ] Develop signature blends using correlation insights
- [ ] Create customer education materials about quality differences

### For Suppliers/Analysts

- [ ] Understand minimum sample size requirements for valid comparisons
- [ ] Implement correlation-based quality assessment
- [ ] Develop consistency metrics for business customers
- [ ] Create market positioning frameworks based on quality clusters

---

## Frequently Asked Questions

**Q: Why not just buy the highest-scoring coffee?**
A: Single exceptional batches don't guarantee consistent supply. Business success requires reliable quality over time.

**Q: How do I balance quality with cost?**
A: Focus on characteristics that matter most for your positioning. Don't pay premium for uncorrelated attributes.

**Q: Can I trust these scores for current purchasing?**
A: Use this as a framework for evaluation, but always test current samples. Quality can vary by specific farm and processing methods.

**Q: What if my preferred origin isn't in the top rankings?**
A: Consider it for seasonal specials or signature blends. Consistency matters more than perfection for core menu items.

**Q: How often should I reevaluate my sourcing strategy?**
A: Annually for primary suppliers, quarterly for market testing, monthly for quality control checks.

---

## Next Steps

1. **Explore the Charts**: Use the interactive visualizations to understand your current sourcing against these benchmarks
2. **Analyze Correlations**: Check the matrices to understand how different quality aspects relate
3. **Develop Your Strategy**: Use the sourcing playbook to create your specific approach
4. **Test and Validate**: Apply the statistical methods when evaluating new suppliers

Remember: The goal isn't to find perfect coffee, but to find consistently excellent coffee that aligns with your business strategy and customer expectations.
