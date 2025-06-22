import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

export const Route = createLazyFileRoute('/documentation')({
  component: Documentation,
})

type SectionKey =
  | 'quickStart'
  | 'charts'
  | 'matrices'
  | 'playbook'
  | 'caseStudies'
  | 'statistical'
  | 'checklist'
  | 'faq'
  | 'nextSteps'

function Documentation() {
  const [expandedSections, setExpandedSections] = useState<Set<SectionKey>>(
    new Set(['quickStart'])
  )

  const toggleSection = (section: SectionKey) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const Section = ({
    id,
    title,
    children,
  }: {
    id: SectionKey
    title: string
    children: React.ReactNode
  }) => (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => toggleSection(id)}
        className="flex w-full items-center justify-between py-4 text-left hover:bg-gray-50 bg-white"
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        {expandedSections.has(id) ? (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {expandedSections.has(id) && (
        <div className="pb-6 leading-relaxed text-gray-700">{children}</div>
      )}
    </div>
  )

  return (
    <div className="mt-2 flex min-h-screen flex-col items-center justify-center gap-4 p-2">
      <div className="rounded bg-white shadow w-full max-w-xl">
        <Section id="quickStart" title="Quick Start Guide">
          <div className="space-y-4 p-6">
            <div>
              <h3 className="mb-2 text-xl font-semibold">
                What This Data Means for Your Coffee Shop
              </h3>
              <p>
                This platform analyzes 890 specialty coffee samples from
                2010-2018, focusing on the quality characteristics that matter
                most for your business decisions. The data covers 97.3% Arabica
                and 2.7% Robusta beans, with comprehensive scoring across 8 key
                attributes.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Quality Score Scale: 70-90 points (industry standard)
              </h3>
              <ul className="ml-4 list-inside list-disc space-y-1">
                <li>
                  <strong>70-79:</strong> Good quality, suitable for blends
                </li>
                <li>
                  <strong>80-84:</strong> Very good, premium positioning
                  possible
                </li>
                <li>
                  <strong>85+:</strong> Exceptional, signature menu material
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Key Terms for Entrepreneurs
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <strong>Aroma:</strong> First impression, crucial for customer
                  attraction
                </div>
                <div>
                  <strong>Flavor:</strong> Core taste experience
                </div>
                <div>
                  <strong>Body:</strong> Mouthfeel and texture
                </div>
                <div>
                  <strong>Acidity:</strong> Brightness, not sourness
                </div>
                <div>
                  <strong>Balance:</strong> How well all elements work together
                </div>
                <div>
                  <strong>Aftertaste:</strong> Lingering taste after swallowing
                </div>
                <div>
                  <strong>Uniformity:</strong> Consistency across batches
                  (business critical)
                </div>
                <div>
                  <strong>Sweetness:</strong> Natural sweetness without added
                  sugar
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="charts" title="Chart Interpretations">
          <div className="space-y-6 p-6">
            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Country Performance Rankings
              </h3>
              <p className="mb-3">
                <strong>What You See:</strong> Horizontal bar chart showing
                total quality scores by country
              </p>
              <p className="mb-3">
                <strong>Business Insight:</strong> This reveals your most
                reliable sourcing options. Countries with higher scores
                consistently deliver better quality coffee.
              </p>
              <div className="rounded-lg bg-blue-50 p-4">
                <h4 className="mb-2 text-lg font-medium">Key Findings:</h4>
                <ul className="space-y-1">
                  <li>
                    <strong>Ethiopia (85.355):</strong> Premium flagship blend
                    material
                  </li>
                  <li>
                    <strong>Colombia:</strong> Quality + market proven (best
                    balance for new shops)
                  </li>
                  <li>
                    <strong>Tanzania:</strong> Consistency champion (uniform
                    experience)
                  </li>
                  <li>
                    <strong>Brazil:</strong> Natural sweetness leader
                    (customer-friendly)
                  </li>
                  <li>
                    <strong>Kenya:</strong> Aftertaste specialist (perfect for
                    espresso)
                  </li>
                </ul>
              </div>
              <p className="mt-3">
                <strong>Action Item:</strong> Choose 2-3 primary countries based
                on your positioning strategy rather than chasing the highest
                score.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Standard Deviation Analysis
              </h3>
              <p className="mb-3">
                <strong>What You See:</strong> Interactive cards showing
                variation in each characteristic
              </p>
              <p className="mb-3">
                <strong>Business Insight:</strong> Lower variation = more
                predictable quality. Higher variation = opportunity for
                differentiation.
              </p>
              <div className="rounded-lg bg-green-50 p-4">
                <h4 className="mb-2 text-lg font-medium">Strategic Implications:</h4>
                <ul className="space-y-1">
                  <li>
                    <strong>Low Variation</strong> (Aroma 0.31, Flavor 0.35,
                    Body 0.31): Reliable benchmarks
                  </li>
                  <li>
                    <strong>Higher Variation</strong> (Uniformity 0.48,
                    Sweetness 0.45): Differentiation opportunities
                  </li>
                  <li>
                    <strong>Very Low</strong> (Moisture 0.04): Quality control
                    is consistent across suppliers
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Supply Volume Analysis
              </h3>
              <p className="mb-3">
                <strong>What You See:</strong> Bar chart showing total bags sold
                by country
              </p>
              <p className="mb-3">
                <strong>Business Insight:</strong> Market reality vs. quality
                scores. High volume = proven customer demand and mature supply
                chains.
              </p>
              <div className="rounded-lg bg-yellow-50 p-4">
                <h4 className="mb-2 text-lg font-medium">Key Discovery:</h4>
                <ul className="space-y-1">
                  <li>
                    <strong>Guatemala:</strong> Highest volume despite moderate
                    quality scores
                  </li>
                  <li>
                    <strong>Colombia:</strong> Perfect balance (high quality +
                    high volume)
                  </li>
                  <li>
                    <strong>Ethiopia:</strong> High quality but smaller market
                    presence
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        <Section id="matrices" title="Matrices Explained">
          <div className="space-y-6 p-6">
            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Correlation Matrix
              </h3>
              <p className="mb-3">
                <strong>What You See:</strong> Heat map showing relationships
                between characteristics
              </p>
              <p className="mb-3">
                <strong>Business Insight:</strong> Some qualities are linked -
                improve one, you likely improve others. Some are independent -
                you need to choose.
              </p>
              <div className="rounded-lg bg-purple-50 p-4">
                <h4 className="mb-2 text-lg font-medium">Critical Findings:</h4>
                <ul className="space-y-1">
                  <li>
                    <strong>Flavor ↔ Aftertaste (0.87):</strong> Strongly
                    linked - focus on one improves both
                  </li>
                  <li>
                    <strong>Flavor ↔ Acidity (0.76):</strong> Bright, flavorful
                    coffees go together
                  </li>
                  <li>
                    <strong>Aroma ↔ Flavor (0.74):</strong> Good smell usually
                    means good taste
                  </li>
                  <li>
                    <strong>Uniformity & Sweetness:</strong> Independent - you
                    must choose your priority
                  </li>
                </ul>
              </div>
              <p className="mt-3">
                <strong>Strategic Choice:</strong> You can't easily have both
                perfect uniformity AND maximum sweetness. Pick your competitive
                advantage.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Altitude Correlation
              </h3>
              <p className="mb-3">
                <strong>What You See:</strong> Scatter plot testing altitude vs.
                quality
              </p>
              <p className="mb-3">
                <strong>Business Insight:</strong> Common myth busted - altitude
                alone doesn't guarantee quality (only 8% correlation).
              </p>
              <p>
                <strong>Action Item:</strong> Don't pay premium for "high
                altitude" marketing. Focus on actual quality scores instead.
              </p>
            </div>
          </div>
        </Section>

        <Section id="playbook" title="Sourcing Playbook">
          <div className="space-y-6 p-6">
            <div>
              <h3 className="mb-2 text-xl font-semibold">
                New Coffee Shop Strategy Framework
              </h3>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="mb-2 text-lg font-medium">
                    Phase 1: Choose Your Positioning
                  </h4>

                  <div className="space-y-3">
                    <div className="rounded bg-gray-50 p-3">
                      <strong>Consistency-First Approach:</strong>
                      <ul className="mt-1 space-y-1">
                        <li>Primary: Tanzania (uniformity leader)</li>
                        <li>Secondary: Colombia (balanced reliability)</li>
                        <li>Message: "Same perfect cup every time"</li>
                      </ul>
                    </div>

                    <div className="rounded bg-gray-50 p-3">
                      <strong>Sweetness-First Approach:</strong>
                      <ul className="mt-1 space-y-1">
                        <li>Primary: Brazil (sweetness leader)</li>
                        <li>Secondary: Ethiopia (premium positioning)</li>
                        <li>Message: "Naturally sweet, less sugar needed"</li>
                      </ul>
                    </div>

                    <div className="rounded bg-gray-50 p-3">
                      <strong>Premium Quality Approach:</strong>
                      <ul className="mt-1 space-y-1">
                        <li>Primary: Ethiopia (quality leader)</li>
                        <li>Secondary: Kenya (aftertaste specialist)</li>
                        <li>Message: "Exceptional coffee experience"</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="mb-2 text-lg font-medium">
                    Phase 2: Risk Management
                  </h4>
                  <ol className="list-inside list-decimal space-y-1">
                    <li>
                      <strong>Multi-Country Sourcing:</strong> Never rely on
                      single origin
                    </li>
                    <li>
                      <strong>Sample Size Rule:</strong> Require multiple
                      batches before committing
                    </li>
                    <li>
                      <strong>Quality Checks:</strong> Monitor moisture content
                      as freshness indicator
                    </li>
                    <li>
                      <strong>Seasonal Planning:</strong> Use exceptional
                      single-origin coffees for limited offerings
                    </li>
                  </ol>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="mb-2 text-lg font-medium">
                    Phase 3: Menu Development
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <strong>Core Blend Strategy:</strong> Use high-scoring,
                      consistent origins (Ethiopia, Colombia)
                    </div>
                    <div>
                      <strong>Signature Drinks:</strong> Espresso (Kenya), Sweet
                      Drinks (Brazil), Consistent Experience (Tanzania)
                    </div>
                    <div>
                      <strong>Seasonal Specials:</strong> Single exceptional
                      batches for higher margins
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="caseStudies" title="Case Studies">
          <div className="space-y-6 p-6">
            <div className="border-l-4 border-red-500 bg-red-50 p-4">
              <h3 className="mb-2 text-xl font-semibold">
                The Papua New Guinea Discovery
              </h3>
              <div className="space-y-2 text-red-800">
                <p>
                  <strong>The Problem:</strong> Initial analysis showed Papua
                  New Guinea as the quality leader (85.75 score).
                </p>
                <p>
                  <strong>The Reality:</strong> This exceptional score came from
                  a single batch in 2012 - not a reliable sourcing pattern.
                </p>
                <p>
                  <strong>The Solution:</strong> Implemented minimum sample size
                  filter (n≥3) to ensure consistency.
                </p>
                <p>
                  <strong>Business Lesson:</strong> One amazing batch doesn't
                  make a reliable supplier. Consistency beats perfection for
                  sustainable business.
                </p>
              </div>
            </div>

            <div className="border-l-4 border-green-500 bg-green-50 p-4">
              <h3 className="mb-2 text-xl font-semibold">
                The Colombia Balance
              </h3>
              <div className="space-y-2 text-green-800">
                <p>
                  <strong>The Discovery:</strong> Colombia ranks #2 in quality
                  (with n≥10 filter) AND #2 in total market sales.
                </p>
                <p>
                  <strong>Business Insight:</strong> Perfect balance of proven
                  quality and market acceptance.
                </p>
                <p>
                  <strong>Why This Matters:</strong> Lower risk for new
                  entrepreneurs - you get both exceptional coffee and customer
                  familiarity.
                </p>
                <p>
                  <strong>Implementation Strategy:</strong> Use Colombia as your
                  "safe bet" primary supplier while experimenting with other
                  origins for differentiation.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="statistical"
          title="Statistical Methods (For Analytics Inquiries)"
        >
          <div className="space-y-4 p-6">
            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Sample Size Validation
              </h3>
              <p className="mb-2">
                <strong>Method:</strong> Progressive filtering from n≥1 to n≥100
                to test ranking stability.
              </p>
              <p className="mb-2">
                <strong>Key Finding:</strong> Ethiopia's score (85.355) remained
                identical across n≥3, n≥5, n≥10, and n≥20, validating our chosen
                threshold.
              </p>
              <p>
                <strong>Statistical Rationale:</strong> n≥3 provides sufficient
                data points for reliable country-level assessment while
                maintaining broad geographic coverage (24 countries).
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Correlation Analysis Methodology
              </h3>
              <p className="mb-2">
                <strong>Approach:</strong> Pearson correlation coefficient
                calculation across all sensory attributes.
              </p>
              <p className="mb-2">
                <strong>Significance Testing:</strong> Correlations above 0.7
                considered strong, 0.5-0.7 moderate, below 0.5 weak.
              </p>
              <p>
                <strong>Business Application:</strong> Strong correlations
                (flavor-aftertaste 0.87) indicate integrated quality systems,
                while weak correlations (uniformity-sweetness) suggest
                independent optimization opportunities.
              </p>
            </div>
          </div>
        </Section>

        <Section id="checklist" title="Implementation Checklist">
          <div className="grid gap-6 md:grid-cols-2 p-6">
            <div>
              <h3 className="mb-2 text-xl font-semibold">
                For New Coffee Shops
              </h3>
              <div className="space-y-2">
                {[
                  'Define quality vs. consistency vs. sweetness priority',
                  'Select 2-3 primary sourcing countries based on strategy',
                  'Establish minimum sample size requirements with suppliers',
                  'Create quality control checklist using moisture content',
                  'Plan seasonal menu strategy for exceptional single batches',
                  'Set up supplier diversification plan',
                ].map((item, index) => (
                  <label key={index} className="flex items-start space-x-2">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">
                For Existing Shops
              </h3>
              <div className="space-y-2">
                {[
                  'Audit current suppliers against quality benchmarks',
                  'Identify gaps in your quality positioning',
                  'Test new origins using statistical validity approach',
                  'Develop signature blends using correlation insights',
                  'Create customer education materials about quality differences',
                ].map((item, index) => (
                  <label key={index} className="flex items-start space-x-2">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="faq" title="Frequently Asked Questions">
          <div className="space-y-4 p-6">
            <div>
              <h4 className="mb-1 font-medium text-lg">
                Q: Why not just buy the highest-scoring coffee?
              </h4>
              <p className="text-gray-700">
                A: Single exceptional batches don't guarantee consistent supply.
                Business success requires reliable quality over time.
              </p>
            </div>

            <div>
              <h4 className="mb-1 font-medium text-lg">
                Q: How do I balance quality with cost?
              </h4>
              <p className="text-gray-700">
                A: Focus on characteristics that matter most for your
                positioning. Don't pay premium for uncorrelated attributes.
              </p>
            </div>

            <div>
              <h4 className="mb-1 font-medium text-lg">
                Q: Can I trust these scores for current purchasing?
              </h4>
              <p className="text-gray-700">
                A: Use this as a framework for evaluation, but always test
                current samples. Quality can vary by specific farm and
                processing methods.
              </p>
            </div>

            <div>
              <h4 className="mb-1 font-medium text-lg">
                Q: What if my preferred origin isn't in the top rankings?
              </h4>
              <p className="text-gray-700">
                A: Consider it for seasonal specials or signature blends.
                Consistency matters more than perfection for core menu items.
              </p>
            </div>

            <div>
              <h4 className="mb-1 font-medium text-lg">
                Q: How often should I reevaluate my sourcing strategy?
              </h4>
              <p className="text-gray-700">
                A: Annually for primary suppliers, quarterly for market testing,
                monthly for quality control checks.
              </p>
            </div>
          </div>
        </Section>

        <Section id="nextSteps" title="Next Steps">
          <div className="space-y-4 p-6">
            <ol className="list-inside list-decimal space-y-2">
              <li>
                <strong>Explore the Charts:</strong> Use the interactive
                visualizations to understand your current sourcing against these
                benchmarks
              </li>
              <li>
                <strong>Analyze Correlations:</strong> Check the matrices to
                understand how different quality aspects relate
              </li>
              <li>
                <strong>Develop Your Strategy:</strong> Use the sourcing
                playbook to create your specific approach
              </li>
              <li>
                <strong>Test and Validate:</strong> Apply the statistical
                methods when evaluating new suppliers
              </li>
            </ol>

            <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="font-medium text-blue-800">
                Remember: The goal isn't to find perfect coffee, but to find
                consistently excellent coffee that aligns with your business
                strategy and customer expectations.
              </p>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}

export default Documentation
