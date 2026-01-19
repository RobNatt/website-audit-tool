'use client'
import { useState } from 'react'

export default function Home() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')

  // Helper function to get score color and status
  const getScoreInfo = (score) => {
    const numScore = Math.round(score * 100)
    if (numScore >= 90) {
      return { 
        color: 'from-green-50 to-green-100', 
        textColor: 'text-green-600',
        status: 'Satisfactory',
        statusColor: 'text-green-700'
      }
    } else if (numScore >= 50) {
      return { 
        color: 'from-yellow-50 to-yellow-100', 
        textColor: 'text-yellow-600',
        status: 'Needs Improvement',
        statusColor: 'text-yellow-700'
      }
    } else {
      return { 
        color: 'from-red-50 to-red-100', 
        textColor: 'text-red-600',
        status: 'Failed',
        statusColor: 'text-red-700'
      }
    }
  }

  const runAudit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResults(null)

    try {
      // Validate URL
      if (!url.startsWith('http')) {
        throw new Error('Please enter a valid URL starting with http:// or https://')
      }

      // Call Google PageSpeed API
      const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
const response = await fetch(
  `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&category=PERFORMANCE&category=ACCESSIBILITY&category=SEO&category=BEST_PRACTICES&strategy=mobile&key=${API_KEY}`
)
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error.message || 'Failed to analyze website')
      }

      setResults(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Helper to detect broken elements
  const getBrokenElements = () => {
    if (!results) return []
    
    const broken = []
    const audits = results.lighthouseResult.audits

    // Check for common issues
    if (audits['errors-in-console']?.score === 0) {
      broken.push('JavaScript errors detected in console')
    }
    if (audits['server-response-time']?.score === 0) {
      broken.push('Extremely slow server response time')
    }
    if (audits['is-crawlable']?.score === 0) {
      broken.push('Website is not crawlable by search engines')
    }
    if (audits['viewport']?.score === 0) {
      broken.push('Missing or incorrect viewport meta tag')
    }
    if (audits['http-status-code']?.score === 0) {
      broken.push('HTTP status code errors detected')
    }

    return broken
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Website Audit Tool
          </h1>
          <p className="text-xl text-gray-600">
            Free website performance and SEO analysis
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Powered by Google PageSpeed Insights
          </p>
        </div>

        {/* Audit Form */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <form onSubmit={runAudit}>
            <div className="mb-6">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
                disabled={loading}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Running Audit...' : 'Run Audit'}
            </button>
          </form>

          {/* Loading State */}
          {loading && (
            <div className="mt-8 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600 font-medium">Analyzing website...</p>
              <p className="text-sm text-gray-500 mt-2">This typically takes 10-30 seconds</p>
            </div>
          )}

          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-semibold">Error</p>
              <p className="text-red-700 mt-1">{error}</p>
            </div>
          )}
        </div>

        {/* Results */}
        {results && !loading && (
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Audit Results</h2>
            
            {/* Broken Elements Warning */}
            {getBrokenElements().length > 0 && (
              <div className="mb-8 bg-red-50 border-2 border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Critical Issues Detected
                </h3>
                <ul className="space-y-2">
                  {getBrokenElements().map((issue, idx) => (
                    <li key={idx} className="text-red-800 flex items-start">
                      <span className="mr-2">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-red-700 font-semibold">
                  These issues need immediate attention and may be preventing customers from using your site.
                </p>
              </div>
            )}

            {/* Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Performance Score */}
              {results.lighthouseResult.categories.performance && (
                <ScoreCard 
                  title="Performance"
                  score={results.lighthouseResult.categories.performance.score}
                />
              )}

              {/* Accessibility Score */}
              {results.lighthouseResult.categories.accessibility && (
                <ScoreCard 
                  title="Accessibility"
                  score={results.lighthouseResult.categories.accessibility.score}
                />
              )}

              {/* SEO Score */}
              {results.lighthouseResult.categories.seo && (
                <ScoreCard 
                  title="SEO"
                  score={results.lighthouseResult.categories.seo.score}
                />
              )}

              {/* Best Practices Score */}
              {results.lighthouseResult.categories['best-practices'] && (
                <ScoreCard 
                  title="Best Practices"
                  score={results.lighthouseResult.categories['best-practices'].score}
                />
              )}
            </div>

            {/* Key Metrics */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Metrics</h3>
              <div className="space-y-3">
                <MetricRow 
                  label="First Contentful Paint" 
                  value={`${(results.lighthouseResult.audits['first-contentful-paint'].numericValue / 1000).toFixed(2)}s`}
                  ideal="< 1.8s"
                />
                <MetricRow 
                  label="Speed Index" 
                  value={`${(results.lighthouseResult.audits['speed-index'].numericValue / 1000).toFixed(2)}s`}
                  ideal="< 3.4s"
                />
                <MetricRow 
                  label="Largest Contentful Paint" 
                  value={`${(results.lighthouseResult.audits['largest-contentful-paint'].numericValue / 1000).toFixed(2)}s`}
                  ideal="< 2.5s"
                />
                <MetricRow 
                  label="Total Blocking Time" 
                  value={`${Math.round(results.lighthouseResult.audits['total-blocking-time'].numericValue)}ms`}
                  ideal="< 200ms"
                />
                <MetricRow 
                  label="Cumulative Layout Shift" 
                  value={results.lighthouseResult.audits['cumulative-layout-shift'].displayValue}
                  ideal="< 0.1"
                />
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Want to improve these scores?
              </h3>
              <p className="text-gray-700 mb-4">
                I specialize in building fast, modern websites that score 90+ across all categories.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a 
                  href="mailto:roberthnattrassiii@gmail.com"
                  className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Email Me
                </a>
                <a 
                  href="tel:2816225095"
                  className="inline-block bg-white text-blue-600 border-2 border-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition"
                >
                  Call: (281) 622-5095
                </a>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                View my portfolio: <a href="https://robnattrassiii.rf.gd" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">robnattrassiii.rf.gd</a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Score Card Component
function ScoreCard({ title, score }) {
  const scoreInfo = getScoreInfo(score)
  const numScore = Math.round(score * 100)
  
  return (
    <div className={`bg-gradient-to-br ${scoreInfo.color} rounded-lg p-6 text-center`}>
      <div className={`text-5xl font-bold ${scoreInfo.textColor} mb-2`}>
        {numScore}
      </div>
      <div className="text-sm font-semibold text-gray-700 mb-1">{title}</div>
      <div className={`text-xs font-medium ${scoreInfo.statusColor}`}>
        {scoreInfo.status}
      </div>
      {numScore < 90 && (
        <div className="text-xs text-gray-600 mt-2">
          Target: 90+
        </div>
      )}
    </div>
  )
}

// Helper function for ScoreCard (needs to be outside component or duplicated)
function getScoreInfo(score) {
  const numScore = Math.round(score * 100)
  if (numScore >= 90) {
    return { 
      color: 'from-green-50 to-green-100', 
      textColor: 'text-green-600',
      status: 'Satisfactory',
      statusColor: 'text-green-700'
    }
  } else if (numScore >= 50) {
    return { 
      color: 'from-yellow-50 to-yellow-100', 
      textColor: 'text-yellow-600',
      status: 'Needs Improvement',
      statusColor: 'text-yellow-700'
    }
  } else {
    return { 
      color: 'from-red-50 to-red-100', 
      textColor: 'text-red-600',
      status: 'Failed',
      statusColor: 'text-red-700'
    }
  }
}

// Metric Row Component
function MetricRow({ label, value, ideal }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100">
      <div>
        <span className="text-gray-700 font-medium">{label}</span>
        <span className="text-gray-500 text-sm ml-2">(Ideal: {ideal})</span>
      </div>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  )
}