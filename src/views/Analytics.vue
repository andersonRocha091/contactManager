<template>
  <div class="analytics-container container-fluid position-relative">
    <div v-if="loading" class="loading-overlay d-flex justify-content-center align-items-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="row g-4 analytics-content" :class="{ 'invisible': loading }">
      <div class="col-md-6">
        <div class="card shadow-sm h-100">
          <div class="card-header">
            <h5 class="card-title mb-0 d-flex align-items-center">
              <i class="bi bi-map me-2 text-muted"></i>
              Segmentação por Estado
            </h5>
          </div>
          <div class="card-body p-3 position-relative">
            <div class="chart-container">
              <canvas ref="stateChartCanvas"></canvas>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card shadow-sm h-100">
          <div class="card-header">
            <h5 class="card-title mb-0 d-flex align-items-center">
              <i class="bi bi-building me-2 text-muted"></i>
              Segmentação por Cidade
            </h5>
          </div>
          <div class="card-body p-3 position-relative">
            <div class="chart-container">
              <canvas ref="cityChartCanvas"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'
import { storeToRefs } from "pinia";
import { useContactStore } from "../stores/contacts";

export default {
    name: 'Analytics',
    setup() {
        const contactStore = useContactStore();
        const { loading, contacts } = storeToRefs(contactStore);
        return {
            contactStore,
            loading,
            contacts,
        };
    },
    data() {
        return {
            stateChart: null,
            cityChart: null,
            stateData: null,
            cityData: null,
            containerWidth: null,
            containerHeight: null
        }
    },
    methods: {
         async initializeCharts() {
            // Check if data is already cached
            if (!this.stateData || !this.cityData) {
                await this.contactStore.fetchContacts();
                
                // Cache the grouped data
                this.stateData = this.contactStore.groupedByField('state');
                this.cityData = this.contactStore.groupedByField('city');
            }

            // Create charts with cached data
            this.createStateChart();
            this.createCityChart();
        },

        createStateChart() {
            // Destroy existing chart
            if (this.stateChart) {
                this.stateChart.destroy();
            }

            // Ensure canvas and data exist
            const ctx = this.$refs.stateChartCanvas;
            if (!ctx || !this.stateData) return;

            try {
                this.stateChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: this.stateData.labels,
                        datasets: [{
                            label: 'Segmentação por estado',
                            data: this.stateData.data,
                            backgroundColor: this.generateColorPalette(this.stateData.labels.length)
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        layout: {
                            padding: 10
                        },
                        plugins: {
                            legend: {
                                position: 'right',
                                labels: {
                                    boxWidth: 20,
                                    padding: 5,
                                    font: {
                                        size: 12
                                    }
                                }
                            },
                            title: {
                                display: false
                            }
                        }
                    }
                });
            } catch (error) {
                console.error('Error creating state chart:', error);
            }
        },

        createCityChart() {
            // Destroy existing chart
            if (this.cityChart) {
                this.cityChart.destroy();
            }

            // Ensure canvas and data exist
            const ctx = this.$refs.cityChartCanvas;
            if (!ctx || !this.cityData) return;

            try {
                this.cityChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: this.cityData.labels,
                        datasets: [{
                            label: 'Segmentação por cidade',
                            data: this.cityData.data,
                            backgroundColor: this.generateColorPalette(this.cityData.labels.length)
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        layout: {
                            padding: 10
                        },
                        plugins: {
                            legend: {
                                position: 'right',
                                labels: {
                                    boxWidth: 20,
                                    padding: 5,
                                    font: {
                                        size: 12
                                    }
                                }
                            },
                            title: {
                                display: false
                            }
                        }
                    }
                });
            } catch (error) {
                console.error('Error creating city chart:', error);
            }
        },

        generateColorPalette(count) {
            const baseColors = [
                'rgba(75, 0, 130, 0.8)',
                'rgba(106, 90, 205, 0.8)',
                'rgba(147, 112, 219, 0.8)',
                'rgba(186, 85, 211, 0.8)',
                'rgba(138, 43, 226, 0.8)',
                'rgba(128, 0, 128, 0.8)',
                'rgba(153, 50, 204, 0.8)'
            ];

            // Repeat colors if needed
            return Array.from({ length: count }, (_, i) => 
                baseColors[i % baseColors.length]
            );
        },
        captureInitialDimensions() {
            this.$nextTick(() => {
                const container = this.$el.querySelector('.analytics-content');
                if (container) {
                    this.containerWidth = container.offsetWidth + 'px';
                    this.containerHeight = container.offsetHeight + 'px';
                }
            });
        }
    },
    mounted() {
        // Capture dimensions before initializing charts
        this.captureInitialDimensions();
        this.initializeCharts();
    },
    beforeUnmount() {
        // Cleanup charts
        if (this.stateChart) {
            this.stateChart.destroy();
        }
        if (this.cityChart) {
            this.cityChart.destroy();
        }
    }
}
</script>

<style scoped>
.analytics-container {
    background-color: #f8f9fa;
    min-height: 500px; /* Ensure minimum height */
    width: 1400px;
    margin-left: 200px;
    margin-top: 50px;
    margin-bottom: 50px;
}

.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
}

.analytics-content {
    transition: opacity 0.3s ease;
}

.card {
    border-radius: 10px;
    overflow: hidden;
}

.card-header {
    background-color: transparent;
    padding: 15px 15px 10px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
}

.card-header .card-title {
    font-size: 1.1rem;
    color: #333;
}

.card-header .card-title i {
    margin-right: 8px;
    opacity: 0.7;
}

.chart-container {
    position: relative;
    width: 100%;
    height: 300px;
}

.card-body {
    padding: 15px;
}

/* Prevent layout shift */
.analytics-content.invisible {
    visibility: visible !important;
    opacity: 0;
}
</style>