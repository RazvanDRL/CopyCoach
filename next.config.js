/** @type {import('next').NextConfig} */
const { withPlausibleProxy } = require('next-plausible')

const nextConfig = {};

module.exports = withPlausibleProxy({
    customDomain: "https://plausible.longtoshort.tech",
})({
    nextConfig
})